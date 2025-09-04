import { Injectable } from '@nestjs/common';

const porta = process.env.PORT ?? 3000


@Injectable()
export class AppService {
  getHello(): string {
    return `<br><body bgcolor="orange"><h1><center>Olá, sejam bem-vindos à minha API de estudo/atividade com Docker, NestJS e Prisma.<br></center></h1>
  <hr>
  <br>
  <br>
  <br> 
  <img src="https://res.cloudinary.com/dynzukn7h/image/upload/v1754500210/WhatsApp_Image_2025-06-16_at_14.58.57_nygrgp.jpg" height="320px" width="210px" alt="alguma coisa">
    <h2><center>Link para a API: <a href="http://localhost:${porta}/api" target="_blank">Aperte Aqui!!!</a></center></h2></body>`;
  }
}
