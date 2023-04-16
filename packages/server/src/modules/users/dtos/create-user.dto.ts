import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsEmail, Matches } from 'class-validator';
import { mobileRegex } from 'src/shared/utils/regex';

export class CreateUserDto {
  // 用户名
  @ApiProperty({ example: '用户_' + Date.now() })
  @IsNotEmpty()
  username: string;

  // 邮箱
  @ApiProperty({ example: '' })
  @IsEmail()
  @Length(3, 200)
  email?: string;

  // 手机号
  @Matches(mobileRegex, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '12234000111' })
  phone: string;

  // 头像
  @ApiProperty({
    example:
      'https://gd-hbimg.huaban.com/07b029c67010c0a17a1c78fcbc92ce612de4cf3ae8dd-Oc4KXC_fw658',
  })
  @IsNotEmpty()
  avatar: string;
}
