import { User } from './entities/user.mongo.entity';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY', // 数据库集合
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(User),
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
