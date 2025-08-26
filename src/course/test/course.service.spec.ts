
import { Test, TestingModule } from "@nestjs/testing"
import { PrismaService } from "../../prisma/prisma.service"
import { CursosService } from "../course.service";
import { Course } from "@prisma/client";
import { courseDto } from "../Dto/create-course.dto";

const dataCouse: Course[] = [
    {
        id: "1",
        name: "java",
        description: "Domine Java: a linguagem que roda de geladeira a satélite, faz você entender herança melhor que em reunião de família e ainda ensina a nunca mais viver sem um café por perto.",
        workload: 60,
        price: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "JavaScript",
        description: "Curso de JavaScript: aprenda a linguagem onde true + true = 2, true + false = 1 e a lógica às vezes parece opcional. Domine o caos e torne-se mestre do front (e do back, se tiver coragem).",
        workload: 60,
        price: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]




const mockPrisma = {
    Course: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),

    }
}

describe("test CursosService", () => {
    let TestCourseService: CursosService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CursosService,
                {
                    provide: PrismaService,
                    useValue: mockPrisma,

                },
            ],
        }).compile()

        TestCourseService = module.get<CursosService>(CursosService);
    });

    //test create
    it("deve criar um curso", async () => {
        const dto: courseDto = {
            name: "java",
            description: "Domine Java: a linguagem que roda de geladeira a satélite, faz você entender herança melhor que em reunião de família e ainda ensina a nunca mais viver sem um café por perto.",
            workload: 60,
            price: 180,
        }

        mockPrisma.Course.create.mockResolvedValue(dataCouse[0])

        expect(await TestCourseService.newCourse(dto)).toEqual(dataCouse[0])
        expect(mockPrisma.Course.create).toHaveBeenCalledWith(dto)

    })

});