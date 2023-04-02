import { ConfigModuleOptions } from '@nestjs/config';

import configuration from './configuration';
import { IS_DEV, IS_PROD } from 'src/shared/utils/env';

const envFilePath = ['.env'];

if (IS_DEV) {
  envFilePath.unshift('.env.dev');
} else if (IS_PROD) {
  envFilePath.unshift('.env.prod');
}

export const configModuleOptions: ConfigModuleOptions = {
  ignoreEnvFile: IS_PROD ? true : false, // 生产环境忽略
  isGlobal: true,
  envFilePath: envFilePath,
  load: [configuration],
};
