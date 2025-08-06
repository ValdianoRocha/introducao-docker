import { Module } from '@nestjs/common';
import { CursosService } from './course.service';
import { CursosController } from './course.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CursosService],
  controllers: [CursosController],
  imports: [PrismaModule],
})
export class CourseModule {}
