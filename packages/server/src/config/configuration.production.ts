import { parseBool } from 'src/shared/utils/type';
import { defineConfig } from './define-config';

import type { BooleanTypes } from 'src/shared/utils/type';

/**
 * 生产环境配置
 */
export default defineConfig({
  appEnv: process.env.APP_ENV,
  port: process.env.APP_PORT,
  database: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: parseBool(process.env.DB_SYNCHRONIZE as BooleanTypes),
    logging: parseBool(process.env.DB_LOGGING as BooleanTypes),
  },
});
