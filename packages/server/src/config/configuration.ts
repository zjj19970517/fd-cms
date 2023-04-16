import genDevelopmentConfig from './configuration.development';
import genProductionConfig from './configuration.production';
import { IS_DEV } from 'src/shared/utils/env';

export interface IConfig {
  appEnv: string;
  port: number | string;
  /**
   * 数据库配置
   */
  mongoDatabase?: {
    host: string;
    port: number;
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
    return genDevelopmentConfig();
  }
  return genProductionConfig();
};
