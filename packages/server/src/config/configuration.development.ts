import { parseBool } from 'src/shared/utils/type';
import { defineConfig } from './define-config';

import type { BooleanTypes } from 'src/shared/utils/type';

/**
 * 测试环境配置
 */
export default defineConfig({
  appEnv: process.env.APP_ENV || 'development',
  port: process.env.APP_PORT || 3000,
  database: {
    url: process.env.DB_URL || 'mongodb://mongo:27017',
    name: process.env.DB_NAME || 'nest-server',
    user: process.env.DB_USER || 'xxxx',
    password: process.env.DB_PASS || '123456',
    synchronize: parseBool(process.env.DB_SYNCHRONIZE as BooleanTypes),
    logging: parseBool(process.env.DB_LOGGING as BooleanTypes),
  },
});
