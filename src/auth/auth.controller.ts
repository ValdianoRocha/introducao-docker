import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBasicAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { loginDto } from './dto/login.dto';
import { ResponseDto } from './dto/response.dto';
import { JwtAuthGuard } from './guard/jwt.guard';
import { adminGuard } from './guard/admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('registerStudent')
  @ApiOperation({ summary: 'Registrar novo estudante' })
  @ApiResponse({ status: 201, description: 'Estudante registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({ type: CreateAuthDto })
  async registerStudent(@Body() data: CreateAuthDto) {
    return this.authService.registerStudent(data);
  }
  
  @Post('registerTeacher')
  @ApiBasicAuth()
  @UseGuards(JwtAuthGuard, adminGuard)
  @ApiOperation({ summary: 'Registrar novo Professor' })
  @ApiResponse({ status: 201, description: 'professor registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({ type: CreateAuthDto })
  async registerTeacher(@Body() data: CreateAuthDto){
    return this.authService.registerTeacher(data)

  }

  @Post('login')
  @ApiOperation({ summary: 'Logar na pagina' })
  @ApiBody({ type: loginDto })
  async login(@Body() loginUser: loginDto): Promise<ResponseDto> {
    return this.authService.login(loginUser)
  }
}
