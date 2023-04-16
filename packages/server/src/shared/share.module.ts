import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedService } from './services/shared.service';
import { configModuleOptions } from '../config/module-options';
import { DatabaseProviders } from './providers/database.providers';
import { LoggerModule } from './logger.module';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), LoggerModule],
  exports: [
    // 共享
    SharedService,
    // 配置中心
    ConfigModule,
    // 日志库
    LoggerModule,
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
