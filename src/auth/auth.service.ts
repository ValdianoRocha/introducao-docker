import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) { }

  /** Responsavel por registar novos alunos 
   * 
   * @param studentData {name, phone, email, password, cpf, address, date_of_birth }
   * @returns 
   *    {id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        }
   */
  async registerStudent(studentData: CreateAuthDto) {
    let Found = await this.prisma.user.findUnique({
      where: { cpf: studentData.cpf }
    })
    if (Found) throw new ConflictException("CPF ja cadastrado!") //verifica cpf existente

    Found = await this.prisma.user.findUnique({
      where: { email: studentData.email }
    })
    if (Found) throw new ConflictException("Email ja cadastrado!") //verifica email existente

    const date_of_birth = new Date(studentData.date_of_birth) // trasforma a data
    const hashedPassword = await bcrypt.hash(studentData.password, 10) // criptografa a senha


    return this.prisma.user.create({
      data: {
        ...studentData,
        date_of_birth,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      }
    })
  }

  async validadeUser(email: string, password: string) {

    const user = await this.prisma.user.findUnique({
      where: { email }
    })
    
    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciais Invalidas!')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new UnauthorizedException('Credenciais Invalidas!')

    return user

  }


  async login(credentials: loginDto) {
    const user = await this.validadeUser(
      credentials.email,
      credentials.password
    )

    const payload = {  // o que eu vou colocar de informação no tokem do ususario
      userId: user.id,
      email: user.email,
      role: user.role
    }

    return {
      access_token: this.jwt.sign(payload)
    }
  }
}
