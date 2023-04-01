import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageConfig from '../package.json';

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .addBearerAuth() // 鉴权功能、Bearer 表示 JWT 方式、注意：这里要选择跟我们项目中使用一致的鉴权方式
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // 访问 /api/doc 可以查看我们的 Swagger 文档
  SwaggerModule.setup('/api/doc', app, document);

  console.log('open swagger doc: http://127.0.0.1:3000/api/doc');
};
