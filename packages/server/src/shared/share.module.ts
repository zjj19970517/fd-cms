import { Module } from '@nestjs/common';
import { SharedService } from './services/shared.service';

@Module({
  exports: [SharedService],
  providers: [SharedService],
})
export class SharedModule {}
