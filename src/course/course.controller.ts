import { Controller } from '@nestjs/common';
import { CursosService } from './course.service';
import { courseDto } from './Dto/create-course.dto';
import { UpdateCourseDto } from './Dto/update-course.dto';

@Controller('cursos')
export class CursosController {
    constructor(
        private CursosService: CursosService
    ) { }


    async newCourse(data: courseDto) {
        return this.CursosService.newCourse(data)
    }


    async allCouses() {
        return this.CursosService.allCourses()
    }


    async oneCourse(id: string) {
        this.CursosService.oneCourse(id)
    }


    async updadeCourse(id: string, data: UpdateCourseDto) {
        this.CursosService.updadeCourse(id, data)
    }


    async deleteCourse(id:string){
        this.CursosService.deletCourse(id)
    }
}
