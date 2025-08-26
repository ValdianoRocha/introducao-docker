import { Test, TestingModule } from "@nestjs/testing"
import { PrismaService } from "../../prisma/prisma.service"
import { CourseService } from "../course.service";
import { Course } from "@prisma/client";
import { courseDto } from "../Dto/create-course.dto";
import { NotFoundException } from "@nestjs/common";
import { UpdateCourseDto } from "../Dto/update-course.dto";

const dataCourse: Course[] = [
    {
        id: "1",
        name: "Java",
        workload: 60,
        description: `Domine Java: a linguagem que roda de geladeira a satélite, faz você entender herança melhor que em reunião de família e ainda ensina a nunca mais viver sem um café por perto.`,
        price: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "JavaScript",
        description: `Curso de JavaScript: aprenda a linguagem onde true + true = 2, true + false = 1 e a lógica às vezes parece opcional. Domine o caos e torne-se mestre do front (e do back, se tiver coragem).`,
        workload: 60,
        price: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]

const mockPrisma = {
    course: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

describe("CourseService", () => {
    let service: CourseService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CourseService,
                {
                    provide: PrismaService,
                    useValue: mockPrisma,
                },
            ],
        }).compile()

        service = module.get<CourseService>(CourseService);
        jest.clearAllMocks(); // limpa mocks antes de cada teste
    });

    // Teste de criação
    it("deve criar um curso com sucesso", async () => {
        const dto: courseDto = {
            name: "Java",
            description: "Domine Java: a linguagem que roda de geladeira a satélite, faz você entender herança melhor que em reunião de família e ainda ensina a nunca mais viver sem um café por perto.",
            workload: 60,
            price: 180,
        }

        mockPrisma.course.create.mockResolvedValue(dataCourse[0])

        const result = await service.newCourse(dto)

        expect(result).toEqual(dataCourse[0])
        expect(mockPrisma.course.create).toHaveBeenCalledWith({ data: dto })
    })

    // Testa mostrar todos os cursos 
    it("deve retornar todos os cursos", async () => {
        mockPrisma.course.findMany.mockResolvedValue(dataCourse)

        const result = await service.allCourses()

        expect(result).toEqual(dataCourse)
        expect(mockPrisma.course.findMany).toHaveBeenCalled()
    })

    // Testa encontrar um curso pelo id bem-sucedida
    it("deve encontrar um curso pelo ID", async () => {
        const id = "123"

        mockPrisma.course.findUnique.mockResolvedValue(dataCourse[0]);

        const result = await service.oneCourse(id)

        expect(result).toEqual(dataCourse[0])
        expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({ where: { id } })
    })

    // Testa falha ao encontrar por id
    it("deve lançar erro se não encontrar o curso por ID", async () => {
        mockPrisma.course.findUnique.mockResolvedValue(null)

        await expect(service.oneCourse("id-invalido"))
            .rejects
            .toThrow(NotFoundException)
    })

    // Testa encontrar curso pelo nome 
    it("deve encontrar um curso pelo nome (case insensitive, contém)", async () => {
        const name = "java"

        mockPrisma.course.findMany.mockResolvedValue(dataCourse)

        const result = await service.findCourseByName(name)

        expect(result).toEqual(dataCourse)
        expect(mockPrisma.course.findMany).toHaveBeenCalledWith({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                }
            }
        })
    })

    // Testa falha ao procurar por nome
    it("deve lançar erro se não encontrar curso pelo nome", async () => {
        mockPrisma.course.findMany.mockResolvedValue([])

        await expect(service.findCourseByName("inexistente"))
            .rejects
            .toThrow(NotFoundException)
    })

    // Teste para atualizar um curso
    it("deve atualizar um curso existente", async () => {
        const id = "123"
        const updateCourse: UpdateCourseDto = {
            name: "Java Avançado",
            description: "Curso atualizado",
            price: 200,
            workload: 80
        }
        const updated = {
            ...dataCourse[0],
            ...updateCourse
        }

        mockPrisma.course.findUnique.mockResolvedValue(dataCourse[0])
        mockPrisma.course.update.mockResolvedValue(updated)

        const resultUpdate = await service.updateCourse(id, updateCourse)

        expect(resultUpdate).toEqual(updated)
        expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({ where: { id } })
        expect(mockPrisma.course.update).toHaveBeenCalledWith({
            where: { id },
            data: updateCourse,
        })
    })

    // Testa erro ao atualizar curso inexistente
    it("deve lançar erro se tentar atualizar curso inexistente", async () => {
        const updateCourse: UpdateCourseDto = {
            name: "Java",
            description: "Curso inexistente",
            price: 0,
            workload: 0
        }
        mockPrisma.course.findUnique.mockResolvedValue(null)

        await expect(service.updateCourse("id-invalido", updateCourse))
            .rejects
            .toThrow(NotFoundException)
    })

    // Testa excluir um curso
    it("deve excluir um curso com sucesso", async () => {
        const id = "123"

        mockPrisma.course.findUnique.mockResolvedValue(dataCourse[0])
        mockPrisma.course.delete.mockResolvedValue(dataCourse[0])

        const result = await service.deleteCourse(id)

        expect(result).toEqual(dataCourse[0])
        expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({ where: { id } })
        expect(mockPrisma.course.delete).toHaveBeenCalledWith({ where: { id } })
    })

    // Testa erro ao tentar excluir curso inexistente
    it("deve lançar erro se tentar excluir curso inexistente", async () => {
        mockPrisma.course.findUnique.mockResolvedValue(null)

        await expect(service.deleteCourse("id-invalido"))
            .rejects
            .toThrow(NotFoundException)
    })
});
