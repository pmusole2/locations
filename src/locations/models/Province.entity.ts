import { AbstractClass } from 'src/common/metadata/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProvinceObj } from '../interfaces/province';
import { Constituency } from './Constituency.entity';
import { District } from './District.entity';

@Entity('province')
export class Province extends AbstractClass implements ProvinceObj {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  provinceName: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];

  @OneToMany(() => Constituency, (constituency) => constituency.province)
  constituencies: Constituency[];
}
