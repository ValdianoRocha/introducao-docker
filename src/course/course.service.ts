import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './Dto/create-course.dto';
import { UpdateCourseDto } from './Dto/update-course.dto';
import { courses } from './seed/seed';

@Injectable()
export class CourseService {
    private readonly logger = new Logger(CourseService.name);
    constructor(
        private prisma: PrismaService
    ) { }

    async newCourse(data: CreateCourseDto) {
        return await this.prisma.course.create({
            data: {
                name: data.name,
                description: data.description,
                workload: data.workload,
                price: data.price
            }
        })
    }


    async allCourses() {
        return await this.prisma.course.findMany()
    }


    async oneCourse(id: string) {
        const course = await this.prisma.course.findUnique({ where: { id } });

        if (!course) {
            throw new NotFoundException(`Curso com ID '${id}' não encontrado`);
        }

        return course;
    }


    async findCourseByName(name: string) {
        const nameFound = await this.prisma.course.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
        });

        if (nameFound.length === 0) {
            throw new NotFoundException(
                `Nenhum curso com nome contendo '${name}' foi encontrado`,
            );
        }

        return nameFound;
    }


    async updateCourse(id: string, data: UpdateCourseDto) {
        const updateFound = await this.prisma.course.findUnique({
            where: { id }
        })

        if (!updateFound) throw new NotFoundException(`Curso com ID '${id}' não encontrado`)

        return await this.prisma.course.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                workload: data.workload,
                price: data.price,
            }
        })
    }


    async deleteCourse(id: string) {
        const course = await this.prisma.course.findUnique({ where: { id } })

        if (!course) {
            throw new NotFoundException(`Curso com ID '${id}' não encontrado`)
        }

        return this.prisma.course.delete({ where: { id } })
    }


    async seedCourses(): Promise<void> {
        for (const course of courses) {
            await this.prisma.course.upsert({
                where: { name: course.name },
                update: {},
                create: course,
            });
        }
        this.logger.log("[seedCourses] cursos criados com sucesso.")
    }
    // async onModuleInit() {
    //     await this.seedCourses();
    // }
}
