import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // biz 模块
    UsersModule, // 用户模块
  ],
})
export class AppModule {}
