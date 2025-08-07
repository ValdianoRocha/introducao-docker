import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put
} from '@nestjs/common';
import { CursosService } from './course.service';
import { courseDto } from './Dto/create-course.dto';
import { UpdateCourseDto } from './Dto/update-course.dto';
import { ApiTags, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CourseResponseDto } from './Dto/courseresponse.dto';

@ApiTags('Cursos')
@Controller('cursos')
export class CursosController {
    constructor(private readonly cursosService: CursosService) { }

    @Post()
    @ApiOperation({
        summary: 'Cria um novo curso',
        description: `Cria um curso com os seguintes campos:<br>
      <ul>
      <li>nome</li>
      <li>Descrição</li>
      <li>Carga Horária</li>
      <li>Valor</li>
      </ul>`
    })
    @ApiBody({ type: courseDto })
    @ApiResponse({ status: 201, description: 'Curso criado com sucesso', type: CourseResponseDto })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async newCourse(@Body() data: courseDto) {
        Logger.log(`${JSON.stringify(data)}`);
        return this.cursosService.newCourse(data);
    }

    @Get()
    @ApiOperation({ summary: 'Retorna todos os cursos cadastrados' })
    @ApiResponse({ status: 200, description: 'Cursos encontrados', type: [CourseResponseDto] })
    async allCourses() {
        return this.cursosService.allCourses();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retorna um curso por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID do curso que deseja buscar' })
    @ApiResponse({ status: 200, description: 'Curso encontrado', type: CourseResponseDto })
    @ApiResponse({ status: 404, description: 'Curso não encontrado' })
    async oneCourse(@Param('id') id: string) {
        return this.cursosService.oneCourse(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualiza um curso existente por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID do curso que deseja atualizar' })
    @ApiBody({
        type: UpdateCourseDto,
        description: `
      Atualiza as informações de um curso, como:<br>
      <ul>
      <li>nome</li>
      <li>Descrição</li>
      <li>Carga Horária</li>
      <li>Valor</li>
      </ul>`
    })
    @ApiResponse({ status: 200, description: 'Curso atualizado com sucesso', type: CourseResponseDto })
    @ApiResponse({ status: 404, description: 'Curso não encontrado' })
    async updateCourse(@Param('id') id: string, @Body() data: UpdateCourseDto) {
        return this.cursosService.updateCourse(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um curso por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID do curso que deseja remover' })
    @ApiResponse({ status: 200, description: 'Curso removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Curso não encontrado' })
    async deleteCourse(@Param('id') id: string) {
        return this.cursosService.deleteCourse(id);
    }
}
