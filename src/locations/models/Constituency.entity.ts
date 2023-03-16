import { AbstractClass } from 'src/common/metadata/common';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ConstituencyObj } from '../interfaces/constituency';
import { District } from './District.entity';
import { Ward } from './Ward.entity';

@Entity('constituency')
export class Constituency extends AbstractClass implements ConstituencyObj {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  constituencyName: string;

  @ManyToOne(() => District, (district) => district.constituencies)
  district: District;

  @OneToMany(() => Ward, (ward) => ward.constituency)
  wards: Ward[];
}
