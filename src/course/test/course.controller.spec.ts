// src/course/test/course.controller.spec.ts

import { Test, TestingModule } from "@nestjs/testing";
import { CourseController } from "../course.controller";
import { CourseService } from "../course.service";
import { Course } from "@prisma/client";
import { CreateCourseDto } from "../Dto/create-course.dto";
import { UpdateCourseDto } from "../Dto/update-course.dto";

// Dados de mock
const coursesMock: Course[] = [
  {
    id: "1",
    name: "Java",
    workload: 60,
    description: `Domine Java: a linguagem que roda de geladeira a satélite...`,
    price: 180,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "JavaScript",
    workload: 60,
    description: `Curso de JavaScript: aprenda a linguagem onde true + true = 2...`,
    price: 180,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [{ provide: CourseService, useValue: mockService }],
    }).compile();

    controller = module.get<CourseController>(CourseController);
  });


  it("Deve criar um novo curso", async () => {
    const courseDto: CreateCourseDto = {
      name: "Java",
      description: "Curso básico de Java",
      price: 50,
      workload: 160,
    };

    mockService.newCourse.mockResolvedValue(coursesMock[0]);

    const result = await controller.newCourse(courseDto);

    expect(mockService.newCourse).toHaveBeenCalledWith(courseDto);
    expect(result).toEqual(coursesMock[0]);
  });



  it("Deve listar todos os cursos", async () => {
    mockService.allCourses.mockResolvedValue(coursesMock);

    const result = await controller.allCourses();

    expect(mockService.allCourses).toHaveBeenCalled();
    expect(result).toEqual(coursesMock);
  });


  it("Deve buscar um curso por ID", async () => {
    const id = "1";
    mockService.oneCourse.mockResolvedValue(coursesMock[0]);

    const result = await controller.oneCourse(id);

    expect(mockService.oneCourse).toHaveBeenCalledWith(id);
    expect(result).toEqual(coursesMock[0]);
  });



  it("Deve buscar um curso por nome", async () => {
    const name = "Java";
    mockService.findCourseByName.mockResolvedValue(coursesMock[0]);

    const result = await controller.findCourseByName(name);

    expect(mockService.findCourseByName).toHaveBeenCalledWith(name);
    expect(result).toEqual(coursesMock[0]);
  });



  it("Deve atualizar um curso por ID", async () => {
    const id = "1";
    const updateDto: UpdateCourseDto = {
      name: "Java Avançado",
      workload: 80
    };
    const updatedCourse = { ...coursesMock[0], ...updateDto };

    mockService.updateCourse.mockResolvedValue(updatedCourse);

    const result = await controller.updateCourse(id, updateDto);

    expect(mockService.updateCourse).toHaveBeenCalledWith(id, updateDto);
    expect(result).toEqual(updatedCourse);
  });



  it("Deve apagar um curso por ID", async () => {
    const id = "1";
    mockService.deleteCourse.mockResolvedValue(coursesMock[0]);

    const result = await controller.deleteCourse(id);

    expect(mockService.deleteCourse).toHaveBeenCalledWith(id);
    expect(result).toEqual(coursesMock[0]);
  });
});