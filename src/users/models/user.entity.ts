import { AbstractClass } from 'src/common/metadata/common';
import { Column, Entity } from 'typeorm';
import { UserObj } from '../interfaces/user.interface';

@Entity('user')
export class User extends AbstractClass implements UserObj {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  phoneNumber: string;
}
