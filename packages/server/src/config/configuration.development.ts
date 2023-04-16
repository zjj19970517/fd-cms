import { parseBool } from 'src/shared/utils/type';

import type { BooleanTypes } from 'src/shared/utils/type';
import type { IConfig } from './configuration';

/**
 * 测试环境配置
 */
export default () => {
  const config: IConfig = {
    appEnv: process.env.APP_ENV,
    port: process.env.APP_PORT,
    mongoDatabase: {
      host: process.env.MONGO_DB_HOST,
      port: parseInt(process.env.MONGO_DB_PORT, 10),
      name: process.env.MONGO_DB_NAME,
      user: process.env.MONGO_DB_USER,
      password: process.env.MONGO_DB_PASS,
      synchronize: parseBool(process.env.MONGO_DB_ENTITY_NAME as BooleanTypes),
      logging: parseBool(process.env.MONGO_DB_SYNCHRONIZE as BooleanTypes),
    },
  };
  return config;
};
