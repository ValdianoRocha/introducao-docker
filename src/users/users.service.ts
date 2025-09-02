import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAuthDto } from '../auth/dto/update-auth.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(cpf: string) {
    const user = await this.prisma.user.findUnique({
      where: { cpf }
    })
    if (!user) throw new NotFoundException("Usuario não encontrado")

    return user;
  }

  async update(cpf: string, updateUserDto: UpdateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { cpf }
    })
    if (!user) throw new NotFoundException("Usuario não encontrado")

      const updateUser = await this.prisma.user.update({
        where: {cpf},
        data: {...updateUserDto}
      })

    return updateUser;
  }

  async remove(cpf: string) {
        const user = await this.prisma.user.findUnique({
      where: { cpf }
    })
    if (!user) throw new NotFoundException("Usuario não encontrado")

      const deteleUser = await this.prisma.user.delete({
        where: {cpf}
      })

    return deteleUser;
  }
}
