import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared/share.module';

@Module({
  imports: [
    // biz 模块
    UsersModule, // 用户模块

    // 共享模块
    SharedModule,
  ],
})
export class AppModule {}
