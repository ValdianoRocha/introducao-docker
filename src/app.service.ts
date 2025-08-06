import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Olá, sejam bem-vindos à minha API de estudo/atividade com Docker, NestJS e Prisma.';
  }
}
