import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursosModule } from './cursos/cursos.module';
import { CorsosController } from './corsos/corsos.controller';

@Module({
  imports: [CursosModule],
  controllers: [AppController, CorsosController],
  providers: [AppService],
})
export class AppModule {}
