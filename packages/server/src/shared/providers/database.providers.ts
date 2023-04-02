import { ConfigService } from '@nestjs/config';
import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';

const MongoDBType: DataSourceOptions['type'] = 'mongodb';

export const DatabaseProviders = [
  // MongoDB 数据库
  {
    provide: 'MONGODB_DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const config = {
        type: MongoDBType,
        url: configService.get<string>('database.url'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [
          path.join(__dirname, `../../modules/**/*.mongo.entity{.ts,.js}`),
        ],
        logging: configService.get<boolean>('database.logging'),
        synchronize: configService.get<boolean>('database.synchronize'),
      };

      const ds = new DataSource(config);
      await ds.initialize();
      return ds;
    },
  },
];
