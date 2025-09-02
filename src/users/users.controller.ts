import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateAuthDto } from '../auth/dto/update-auth.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'Buscar um usuário pelo CPF' })
  @ApiParam({ name: 'cpf', description: 'CPF do usuário', example: '12345678901' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('cpf') cpf: string) {
    
    return this.userService.findOne(cpf);
  }

  @Put(':cpf')
  @ApiOperation({ summary: 'Atualizar dados de um usuário pelo CPF' })
  @ApiParam({ name: 'cpf', description: 'CPF do usuário', example: '12345678901' })
  @ApiBody({ type: UpdateAuthDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  update(@Param('cpf') cpf: string, @Body() updateUserDto: UpdateAuthDto) {
    return this.userService.update(cpf, updateUserDto);
  }

  @Delete(':cpf')
  @ApiOperation({ summary: 'Remover um usuário pelo CPF' })
  @ApiParam({ name: 'cpf', description: 'CPF do usuário', example: '12345678901' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('cpf') cpf: string) {
    return this.userService.remove(cpf);
  }
}
