import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [CourseModule, AuthModule, UserModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
