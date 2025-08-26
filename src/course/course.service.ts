import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { courseDto } from './Dto/create-course.dto';
import { UpdateCourseDto } from './Dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(
        private prisma: PrismaService
    ) { }

    async newCourse(data: courseDto) {
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
}
