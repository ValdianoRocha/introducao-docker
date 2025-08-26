import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [CourseService],
  controllers: [CourseController],
  imports: [PrismaModule],
})
export class CourseModule {}
