import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/shared/share.module';

@Module({
  controllers: [UsersController], // 一个模块可以包含多个 controller
  providers: [UsersService], // IOC、DI 模式
  imports: [SharedModule],
})
export class UsersModule {}
