import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { loginDto } from '../dto/login.dto';

// Mocks das dependências
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwt = {
  sign: jest.fn(),
};

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService
  let prisma: PrismaService
  let jwt: JwtService

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    prisma = module.get<PrismaService>(PrismaService)
    jwt = module.get<JwtService>(JwtService)
  })

  describe('registerStudent', () => {
    const studentData: CreateAuthDto = {
      name: 'John Doe',
      phone: '11987654321',
      address: 'Rua Exemplo, 123',
      cpf: '12345678900',
      date_of_birth: '01/01/2000',
      email: 'john.doe@test.com',
      password: 'password123',
    }

    it('Deve registrar um aluno com sucesso e retornar os dados esperados', async () => {
      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null) // Para a verificação de CPF
        .mockResolvedValueOnce(null); // Para a verificação de email

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

      const createdUser = {
        id: 'user-id-123',
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        role: UserRole.ALUNO,
      };
      mockPrisma.user.create.mockResolvedValue(createdUser);

      const result = await service.registerStudent(studentData);

      expect(result).toEqual(createdUser);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { cpf: studentData.cpf } });
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: studentData.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(studentData.password, 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          ...studentData,
          date_of_birth: expect.any(Date),
          password: 'hashed_password',
        },
        select: { id: true, name: true, email: true, phone: true, role: true },
      });
    })

    it('Deve lançar ConflictException se o CPF já existir', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({ cpf: studentData.cpf })

      await expect(service.registerStudent(studentData)).rejects.toThrow(ConflictException)
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { cpf: studentData.cpf } })
      expect(mockPrisma.user.create).not.toHaveBeenCalled()
    })

    it('Deve lançar ConflictException se o email já existir', async () => {
      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null) // Para a verificação de CPF
        .mockResolvedValueOnce({ email: studentData.email }) // Para a verificação de email

      await expect(service.registerStudent(studentData)).rejects.toThrow(ConflictException)
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: studentData.email } })
      expect(mockPrisma.user.create).not.toHaveBeenCalled()
    })
  })

  describe('validadeUser', () => {
    const mockUser: User = {
      id: 'user-id-123',
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: 'hashed_password',
      phone: '11987654321',
      address: 'Rua Exemplo, 123',
      cpf: '12345678900',
      date_of_birth: new Date('2000-01-01'),
      role: UserRole.ALUNO,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    it('Deve validar um usuário com sucesso e retornar o objeto User', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validadeUser(mockUser.email, 'password123');

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: mockUser.email } });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);
    })

    it('Deve lançar UnauthorizedException se o usuário não for encontrado', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.validadeUser('nao.existe@test.com', 'senha')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockPrisma.user.findUnique).toHaveBeenCalled();
    })

    it('Deve lançar UnauthorizedException se a senha for incorreta', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.validadeUser(mockUser.email, 'senha_errada')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(bcrypt.compare).toHaveBeenCalled();
    });
  })

  describe('login', () => {
    const mockUser: User = {
      id: 'user-id-123',
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: 'hashed_password',
      phone: '11987654321',
      address: 'Rua Exemplo, 123',
      cpf: '12345678900',
      date_of_birth: new Date('2000-01-01'),
      role: UserRole.ALUNO,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const loginCredentials: loginDto = {
      email: mockUser.email,
      password: 'password123',
    }

    it('Deve retornar um access_token em caso de login bem-sucedido', async () => {
      jest.spyOn(service, 'validadeUser').mockResolvedValue(mockUser)

      mockJwt.sign.mockReturnValue('mocked-jwt-token')

      const result = await service.login(loginCredentials)

      expect(result).toEqual({ access_token: 'mocked-jwt-token' })

      expect(service.validadeUser).toHaveBeenCalledWith(loginCredentials.email, loginCredentials.password)

      const expectedPayload = {
        userId: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      }
      expect(mockJwt.sign).toHaveBeenCalledWith(expectedPayload)
    })
  })
})