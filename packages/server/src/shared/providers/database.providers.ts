import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';

const MongoDBType: DataSourceOptions['type'] = 'mongodb';

export const DatabaseProviders = [
  // MongoDB 数据库
  {
    provide: 'MONGODB_DATA_SOURCE',
    import: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const config = {
        type: MongoDBType,
        host: configService.get<string>('mongoDatabase.host'),
        port: configService.get<number>('mongoDatabase.port'),
        username: configService.get<string>('mongoDatabase.user'),
        password: configService.get<string>('mongoDatabase.password'),
        database: configService.get<string>('mongoDatabase.name'),
        entities: [
          path.join(__dirname, `../../modules/**/*.mongo.entity{.ts,.js}`),
        ],
        logging: configService.get<boolean>('mongoDatabase.logging'),
        synchronize: configService.get<boolean>('mongoDatabase.synchronize'),
      };

      const ds = new DataSource(config);
      await ds.initialize();
      return ds;
    },
  },
];
