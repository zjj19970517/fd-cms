import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  // ID
  @ObjectIdColumn()
  _id: ObjectID;

  // 用户名
  @Column('text')
  username: string;

  // 头像
  @Column('text')
  avatar: string;

  // 邮箱
  @Column({ length: 200 })
  email?: string;

  // 手机号
  @Column('text')
  phone: string;
}
