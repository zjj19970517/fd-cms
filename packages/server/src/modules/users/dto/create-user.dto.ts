import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '测试姓名' })
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ example: '111112323@qq.com' })
  @IsNotEmpty()
  @IsEmail()
  @Length(3, 200)
  email?: string;
}
