import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../users.service';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';


const mockPrisma = {
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

}

const userDb: User[] = [{
  id: "id-1",
  name: "nome",
  address: "endereço",
  cpf: "cpf",
  email: "email",
  password: "senha",
  phone: "numero",
  role: "ADMIN",
  date_of_birth: new Date,
  createdAt: new Date,
  updatedAt: new Date,
}, {
  id: "id-2",
  name: "nome",
  address: "endereço",
  cpf: "cpf",
  email: "email",
  password: "senha",
  phone: "numero",
  role: "ADMIN",
  date_of_birth: new Date,
  createdAt: new Date,
  updatedAt: new Date,
}]

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        { provide: PrismaService, useValue: mockPrisma }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe("findAll", () => {
    it("sucesso: deve mostrar todos os usuarios", async () => {
      mockPrisma.user.findMany.mockResolvedValue(userDb)

      const result = await service.findAll()
      expect(result).toEqual(userDb)
      expect(mockPrisma.user.findMany).toHaveBeenCalledWith()
    })
  })

  describe("findOne", () => {
    it("sucesso: deve retornar o usuario por cpf", async () => {
      const cpf = "cpf"

      mockPrisma.user.findUnique.mockResolvedValue(userDb[0])

      const result = await service.findOne(cpf)

      expect(result).toEqual(userDb[0])
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { cpf } })
    })

    it("falha: deve lançar erro se o cpf não for encontrado", async () => {
      const cpf = "cpf-errado"

      mockPrisma.user.findUnique.mockResolvedValue(null)

      await expect(service.findOne(cpf))
        .rejects
        .toThrow(NotFoundException)
    })
  })

  describe("update", () => {
    const cpf = "cpf"
    const newData: UpdateAuthDto = {
      name: "teste",
      address: "rua"
    }
    const updadeUser = { ...userDb[0], ...newData }

    it("sucesso: deve atualizar as informacoes de um usuario pelo cpf", async () => {

      mockPrisma.user.findUnique.mockResolvedValue(userDb[0])
      mockPrisma.user.update.mockResolvedValue(updadeUser)

      const result = await service.update(cpf, newData)

      expect(result).toEqual(updadeUser)
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { cpf }
      })
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { cpf },
        data: { ...newData },
      })
    })

    it("Falhar: deve lançar erro se não encontrar o usuario", async () => {

      mockPrisma.user.findUnique.mockResolvedValue(null)

      await expect(service.update(cpf, newData))
        .rejects
        .toThrow(NotFoundException)
    })
  })

  describe("remove", () => {
    const cpf = "cpf"
    it("sucesso: deve apagar um usuario", async () => {

      mockPrisma.user.findUnique.mockResolvedValue(userDb[0])
      mockPrisma.user.delete.mockResolvedValue(userDb[0])

      const result = await service.remove(cpf)

      expect(result).toEqual(userDb[0])
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { cpf }
      })
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { cpf }
      })
    })

    it("falha: deve lamçar erro se não encontrar usuario", async () => {

      mockPrisma.user.findUnique.mockResolvedValue(null)

      await expect(service.remove(cpf))
        .rejects
        .toThrow(NotFoundException)
    })
  })

});
