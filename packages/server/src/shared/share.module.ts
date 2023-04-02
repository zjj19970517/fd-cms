import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedService } from './services/shared.service';
import { configModuleOptions } from '../config/module-options';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  exports: [
    // 共享
    SharedService,
    // 配置中心
    ConfigModule,
  ],
  providers: [SharedService],
})
export class SharedModule {}
