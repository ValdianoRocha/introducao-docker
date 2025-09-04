import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './Dto/create-course.dto';
import { UpdateCourseDto } from './Dto/update-course.dto';
import { ApiTags, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiBasicAuth } from '@nestjs/swagger';
import { CourseResponseDto } from './Dto/courseresponse.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { alunoGuard } from '../auth/guard/aluno.guard';
import { adminGuard } from '../auth/guard/admin.guard';
import { professorGuard } from '../auth/guard/professor.guard';



@ApiTags('Cursos')
@Controller('cursos')
export class CourseController {
    constructor(private readonly CourseService: CourseService) { }

    @Post()
    @ApiBasicAuth()
    @UseGuards(JwtAuthGuard, adminGuard, professorGuard)
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
    @ApiBody({ type: CreateCourseDto })
    @ApiResponse({ status: 201, description: 'Curso criado com sucesso', type: CourseResponseDto })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async newCourse(@Body() data: CreateCourseDto) {
        return this.CourseService.newCourse(data);
    }

    @Get()
    @ApiOperation({ summary: 'Retorna todos os cursos cadastrados' })
    @ApiResponse({ status: 200, description: 'Cursos encontrados', type: [CourseResponseDto] })
    async allCourses() {
        return this.CourseService.allCourses();
    }

    @Get(':id')
    @ApiBasicAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Retorna um curso por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID do curso que deseja buscar' })
    @ApiResponse({ status: 200, description: 'Curso encontrado', type: CourseResponseDto })
    @ApiResponse({ status: 404, description: 'Curso não encontrado' })
    async oneCourse(@Param('id') id: string) {
        return this.CourseService.oneCourse(id);
    }

    @Get('buscar-por-nome/:name')
    @ApiOperation({ summary: 'Retorna um curso por nome' })
    @ApiParam({ name: 'name', type: String, description: 'Nome do curso que deseja buscar' })
    @ApiResponse({ status: 200, description: 'Curso encontrado', type: CourseResponseDto })
    @ApiResponse({ status: 404, description: 'Curso não encontrado' })
    async findCourseByName(@Param('name') name: string) {
        return this.CourseService.findCourseByName(name);
    }

    @Put(':id')
    @ApiBasicAuth()
    @UseGuards(JwtAuthGuard, adminGuard, professorGuard)
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
        return this.CourseService.updateCourse(id, data);
    }

    @Delete(':id')
    @ApiBasicAuth()
    @UseGuards(JwtAuthGuard, adminGuard, professorGuard)
    @ApiOperation({ summary: 'Remove um curso por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID do curso que deseja remover' })
    @ApiResponse({ status: 200, description: 'Curso removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Curso não encontrado' })
    async deleteCourse(@Param('id') id: string) {
        return this.CourseService.deleteCourse(id);
    }
}
