import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { courseDto } from './Dto/create-course.dto';
import { UpdateCourseDto } from './Dto/update-course.dto';

@Injectable()
export class CursosService {
    constructor(
        private prisma: PrismaService
    ) { }

    async newCourse(data: courseDto) {
        return this.prisma.course.create({
            data: {
                name: data.name,
                descripton: data.description,
                workload: data.workload,
                price: data.price
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        })
    }


    async allCourses() {
        return this.prisma.course.findMany({
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        })
    }


    async oneCourse(id: string) {
        return this.prisma.course.findUnique({
            where: { id }
        })
    }


    async updateCourse(id: string, data: UpdateCourseDto) {
        return this.prisma.course.update({
            where: { id },
            data: {
                name: data.name,
                descripton: data.description,
                workload: data.workload,
                price: data.price,
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        })
    }


    async deleteCourse(id: string) {
        const course = this.prisma.course.delete({
            where: { id },
        })

        return `O curso de ID: ${(await course).id} - "${(await course).name}" foi apagado com sucesso!`
    }
}
