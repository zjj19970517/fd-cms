import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {
  getEnv() {
    return {
      a: 1,
    };
  }
}
