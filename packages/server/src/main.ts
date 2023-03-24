import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 生成 Swagger 文档
  generateDocument(app);
  // 添加全局校验管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
