import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';

// 一个异步函数，它负责引导我们的应用程序
async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  // NestFactory 是 Nest 的核心类
  // 创建一个 app 应用
  const app = await NestFactory.create(AppModule);
  // 生成 Swagger 文档
  generateDocument(app);
  // 添加全局校验管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`swagger doc：http://127.0.0.1:${PORT}/api/doc`);
}

bootstrap();
