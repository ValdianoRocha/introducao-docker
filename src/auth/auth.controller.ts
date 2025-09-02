import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { loginDto } from './dto/login.dto';
import { ResponseDto } from './dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiOperation({ summary: 'Registrar novo estudante' })
  @ApiResponse({ status: 201, description: 'Estudante registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({ type: CreateAuthDto })
  async registerStudent(@Body() data: CreateAuthDto) {
    return this.authService.registerStudent(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Logar na pagina' })
  @ApiBody({ type: loginDto })
  async login(@Body() loginUser: loginDto): Promise<ResponseDto> {
    return this.authService.login(loginUser)
  }
}
