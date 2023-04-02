import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedService } from './services/shared.service';
import { configModuleOptions } from '../config/module-options';
import { DatabaseProviders } from './providers/database.providers';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  exports: [
    // 共享
    SharedService,
    // 配置中心
    ConfigModule,
    // 数据库
    ...DatabaseProviders,
  ],
  providers: [
    // 共享
    SharedService,
    // 数据库
    ...DatabaseProviders,
  ],
})
export class SharedModule {}
