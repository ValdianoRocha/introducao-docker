import { Test, TestingModule } from "@nestjs/testing"
import { PrismaService } from "../../prisma/prisma.service"
import { CourseService } from "../course.service";
import { Course } from "@prisma/client";
import { CreateCourseDto } from "../Dto/create-course.dto";
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
];

const mockPrisma = {
    course: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
};

describe("CourseService", () => {
    let service: CourseService;

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CourseService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<CourseService>(CourseService);
    });


    describe('newCourse', () => {
        it("deve criar um curso com sucesso", async () => {
            const dto: CreateCourseDto = {
                name: "Java",
                description: "Descrição do curso",
                workload: 60,
                price: 180,
            };

            mockPrisma.course.create.mockResolvedValue(dataCourse[0]); //aqui eu chamo o mokc de prisma e digo o que o create deve resposta/retorno

            const result = await service.newCourse(dto); // aqui eu estou chamando o service.newcouse e dando pra ele o que ele é para trabalhar

            expect(result).toEqual(dataCourse[0]); // aqui eu espero que o resultado do service e o que espero que seja, no caso o datacouse
            expect(mockPrisma.course.create).toHaveBeenCalledWith({ data: dto }); // aqui eu espero a função create de prisma seja chamada e que consiga trabalhar com a informação que dei 
        });
    });


    describe('allCourses', () => {
        it("deve retornar todos os cursos", async () => {
            mockPrisma.course.findMany.mockResolvedValue(dataCourse);//aqui eu chamo o mokc de prisma e digo o que o findMany deve resposta/retorno

            const result = await service.allCourses();// aqui eu estou chamando o service.allCouses e dando pra ele o que ele é para trabalhar

            expect(result).toEqual(dataCourse);// aqui eu espero que o resultado do service e o que espero que seja, no caso o datacouse
            expect(mockPrisma.course.findMany).toHaveBeenCalled();// aqui eu espero a função findMany de prisma seja chamada e que consiga trabalhar com a informação que dei 
        });
    });


    describe('oneCourse', () => {
        it("deve encontrar um curso pelo ID", async () => {
            const id = "123";
            mockPrisma.course.findUnique.mockResolvedValue(dataCourse[0]);

            const result = await service.oneCourse(id);

            expect(result).toEqual(dataCourse[0]);
            expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({ where: { id } });
        });

        it("deve lançar erro se não encontrar o curso por ID", async () => {
            mockPrisma.course.findUnique.mockResolvedValue(null);

            await expect(service.oneCourse("id-invalido")).rejects.toThrow(NotFoundException);
            expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({ where: { id: "id-invalido" } });
        });
    });


    describe('findCourseByName', () => {
        it("deve encontrar um curso pelo nome (case insensitive, contém)", async () => {
            const name = "java";
            mockPrisma.course.findMany.mockResolvedValue([dataCourse[0]]);

            const result = await service.findCourseByName(name);

            expect(result).toEqual([dataCourse[0]]);
            expect(mockPrisma.course.findMany).toHaveBeenCalledWith({
                where: {
                    name: {
                        contains: name,
                        mode: "insensitive"
                    }
                }
            });
        });

        it("deve lançar erro se não encontrar curso pelo nome", async () => {
            mockPrisma.course.findMany.mockResolvedValue([]);

            await expect(service.findCourseByName("Nao-Existe")).rejects.toThrow(NotFoundException);
            expect(mockPrisma.course.findMany).toHaveBeenCalled();
        });
    });


    describe('updateCourse', () => {
        const id = "123";
        const updateDto: UpdateCourseDto = {
            name: "Java Avançado",
            description: "Curso atualizado",
            price: 200,
            workload: 80
        };

        it("deve atualizar um curso existente", async () => {
            const updated = { ...dataCourse[0], ...updateDto };

            mockPrisma.course.findUnique.mockResolvedValue(dataCourse[0]);
            mockPrisma.course.update.mockResolvedValue(updated);

            const result = await service.updateCourse(id, updateDto);

            expect(result).toEqual(updated);
            expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({ where: { id } });
            expect(mockPrisma.course.update).toHaveBeenCalledWith({ where: { id }, data: updateDto });
        });

        it("deve lançar erro se tentar atualizar curso inexistente", async () => {
            mockPrisma.course.findUnique.mockResolvedValue(null);

            await expect(service.updateCourse(id, updateDto)).rejects.toThrow(NotFoundException);
            expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({ where: { id } });
        });
    });


    describe('deleteCourse', () => {
        const id = "123";

        it("deve excluir um curso com sucesso", async () => {
            mockPrisma.course.findUnique.mockResolvedValue(dataCourse[0]);
            mockPrisma.course.delete.mockResolvedValue(dataCourse[0]);

            const result = await service.deleteCourse(id);

            expect(result).toEqual(dataCourse[0]);
            expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({ where: { id } });
            expect(mockPrisma.course.delete).toHaveBeenCalledWith({ where: { id } });
        });

        it("deve lançar erro se tentar excluir curso inexistente", async () => {
            mockPrisma.course.findUnique.mockResolvedValue(null);

            await expect(service.deleteCourse(id)).rejects.toThrow(NotFoundException);
            expect(mockPrisma.course.findUnique).toHaveBeenCalledWith({ where: { id } });
        });
    });
});