import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { loginDto } from './dto/login.dto';


const admin: CreateAuthDto = {
  name: "",
  address: "",
  cpf: "",
  email: "",
  password: "",
  date_of_birth: "01-01-2000",
  phone: ""
}
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);


  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) { }


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


  async seedAdmin(): Promise<void> {
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD
      const existingAdmin = await this.prisma.user.findUnique({
        where: { email: adminEmail },
      });
      if (!adminEmail) throw new NotFoundException
      if (!adminPassword) throw new NotFoundException
      

      if (existingAdmin) {
        this.logger.log('[SeedAdmin] Admin já existe.');
        return;
      }

      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await this.prisma.user.create({
        data: {
          ...admin,
          email: adminEmail,
          password: hashedPassword, // usar senha criptografada
          date_of_birth: new Date(admin.date_of_birth), // <-- conversão correta
          role: "ADMIN"
        },
      });

      this.logger.log('[SeedAdmin] Admin criado com sucesso.');
    } catch (error) {
      this.logger.error(`Erro ao criar admin seed: ${error.message}`, error.stack);
      throw error;
    }
  }

  async onModuleInit() {
    await this.seedAdmin();
  }

  async registerTeacher(teacherData: CreateAuthDto){
    const emailFound = await this.prisma.user.findUnique({
      where: {email: teacherData.email}
    })
    if(emailFound) throw new ConflictException("Email ja cadastrado")
    
    const cpfFound = await this.prisma.user.findUnique({
      where: {cpf: teacherData.cpf}
    }) 
    if(cpfFound) throw new ConflictException("CPF ja cadastrado")

    const hashedPassword = await bcrypt.hash(teacherData.password,10)

    const newTeacher =  await this.prisma.user.create({
      data: {
        ...teacherData,
        password: hashedPassword,
        role: "PROFESSOR"
      }
    })
  }
}
