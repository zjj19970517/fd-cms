import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SharedModule } from 'src/shared/share.module';
import { UserProviders } from './user.providers';

@Module({
  controllers: [UsersController], // 一个模块可以包含多个 controller
  providers: [UsersService, ...UserProviders], // IOC、DI 模式
  imports: [SharedModule],
})
export class UsersModule {}
