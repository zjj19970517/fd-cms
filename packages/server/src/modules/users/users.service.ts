import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SharedService } from '../../shared/services/shared.service';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.mongo.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly sharedService: SharedService,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  create(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
