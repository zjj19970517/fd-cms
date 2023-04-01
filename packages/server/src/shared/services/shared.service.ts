import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  // 测试方法
  getTest() {
    return {
      test: 'test',
    };
  }
}
