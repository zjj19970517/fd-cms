import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { SharedService } from '../../../shared/services/shared.service';
import { MongoRepository } from 'typeorm';
import { User } from '../entities/user.mongo.entity';
import { LoggerService } from 'src/shared/services/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly sharedService: SharedService,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(UsersService.name);
  }

  create(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

  findAll() {
    this.logger.info('findAll', '查询正常');
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const ret = await this.userRepository.findOneBy(id);
    console.log('ret', ret);
    if (ret) {
      return ret;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
