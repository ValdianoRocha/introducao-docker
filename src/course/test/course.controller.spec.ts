import { Test, TestingModule } from "@nestjs/testing";
import { CourseController } from "../course.controller";
import { CourseService } from "../course.service";
import { Course } from "@prisma/client";
import { CreateCourseDto } from "../Dto/create-course.dto";  // Nome de classe/arquivo em PascalCase

const coursesMock: Course[] = [
  {
    id: "1",
    name: "Java",
    workload: 60,
    description: `Domine Java: a linguagem que roda de geladeira a satélite, faz você entender herança melhor do que em reunião de família e ainda ensina a nunca mais viver sem um café por perto.`,
    price: 180,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "JavaScript",
    workload: 60,
    description: `Curso de JavaScript: aprenda a linguagem onde true + true = 2, true + false = 1 e a lógica às vezes parece opcional. Domine o caos e torne-se mestre do front (e do back, se tiver coragem).`,
    price: 180,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const courseDto: CreateCourseDto = {
  name: "Java",
  description: "Curso básico de Java",
  price: 50,
  workload: 160,
};

const mockService = {
  newCourse: jest.fn(),
  allCourses: jest.fn(),
  oneCourse: jest.fn(),
  findCourseByName: jest.fn(),
  updateCourse: jest.fn(),
  deleteCourse: jest.fn(),
};

describe("CourseController", () => {
  let controller: CourseController;
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [{ provide: CourseService, useValue: mockService }],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get(CourseService);
  });

  //teste para criar curso
  it("deve criar um curso", async () => {
    mockService.newCourse.mockResolvedValue(coursesMock[0]);

    expect(await controller.newCourse(courseDto)).toEqual(coursesMock[0]);
    expect(service.newCourse).toHaveBeenCalledWith(courseDto);
  });

  //teste para listar todos os cursos
  it("deve listar todos os cursos", async () => {
    mockService.allCourses.mockResolvedValue(coursesMock);

    expect(await controller.allCourses()).toEqual(coursesMock);
    expect(service.allCourses).toHaveBeenCalled();
  });

  //teste para procurar curso por id
  it("deve buscar um curso por ID", async () => {
    mockService.oneCourse.mockResolvedValue(coursesMock[0]);

    expect(await controller.oneCourse("id")).toEqual(coursesMock[0]);
    expect(service.oneCourse).toHaveBeenCalledWith("id");
  });

  //teste para procurar por nome
  it("deve buscar um curso por nome", async () => {
    mockService.findCourseByName.mockResolvedValueOnce(coursesMock[0]);

    expect(await controller.findCourseByName("Java")).toEqual(coursesMock[0]);
    expect(service.findCourseByName).toHaveBeenCalledWith("Java");
  });

  //teste para atualizar
  it("deve atualizar um curso por ID", async () => {
    mockService.updateCourse.mockResolvedValue(coursesMock[0]);

    expect(await controller.updateCourse("id", courseDto)).toEqual(coursesMock[0]);
    expect(service.updateCourse).toHaveBeenCalledWith("id", courseDto);
  });

  //teste para apagar
  it("deve apagar um curso por ID", async () => {
    mockService.deleteCourse.mockResolvedValue(coursesMock[0]);

    expect(await controller.deleteCourse("id")).toEqual(coursesMock[0]);
    expect(service.deleteCourse).toHaveBeenCalledWith("id");
  });
});
