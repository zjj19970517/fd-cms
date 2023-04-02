import developmentConfig from './configuration.development';
import productionConfig from './configuration.production';
import { IS_DEV } from 'src/shared/utils/env';

export interface IConfig {
  appEnv: string;
  port: number | string;
  /**
   * 数据库配置
   */
  database?: {
    url: string;
    name: string;
    user: string;
    password: string;
    synchronize: boolean;
    logging: boolean;
  };
}

/**
 * 配置中心
 */
export default (): IConfig => {
  if (IS_DEV) {
    return developmentConfig;
  }
  return productionConfig;
};
