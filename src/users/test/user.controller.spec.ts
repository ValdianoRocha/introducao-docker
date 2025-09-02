import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../users.controller';
import { UserService } from '../users.service';
import { User } from '@prisma/client';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';

const mockService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
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

describe('UserController', () => {
  let controller: UserController;
  let service: UserService
  let result;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService)
  });

  it("Get/ deve retornar todos os usuarios", async () => {

    mockService.findAll.mockResolvedValue(userDb)

    result = await controller.findAll()

    expect(result).toEqual(userDb)
    expect(mockService.findAll).toHaveBeenCalled()
  });

  it("Get/:cpf deve retornar um usuario pelo cpf", async () => {
    const cpf = "cpf"

    mockService.findOne.mockResolvedValue(userDb[0])

    result = await controller.findOne(cpf)

    expect(result).toEqual(userDb[0])
    expect(mockService.findOne).toHaveBeenCalledWith(cpf)
  });

  it("Put/:cpf deve atualizar um usuario", async () => {
    const cpf = "cpf"
    const updadeUser: UpdateAuthDto = {
      name: "teste",
      address: "rua"
    }

    mockService.update.mockResolvedValue(userDb[0])

    result = await controller.update(cpf, updadeUser)

    expect(result).toEqual(userDb[0])
    expect(mockService.update).toHaveBeenCalledWith(cpf, updadeUser)
  });

  it("Delete/:cpf deve apagar um usuario", async () => {
    const cpf = "cpf"

    mockService.remove.mockResolvedValue(userDb[0])

    result = await controller.remove(cpf)

    expect(result).toEqual(userDb[0])
    expect(mockService.remove).toHaveBeenCalledWith(cpf)
  });
});
