import { AbstractClass } from 'src/common/metadata/common';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ConstituencyObj } from '../interfaces/constituency';
import { Province } from './Province.entity';
import { Ward } from './Ward.entity';

@Entity('constituency')
export class Constituency extends AbstractClass implements ConstituencyObj {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  constituencyName: string;

  @ManyToOne(() => Province, (province) => province.constituencies)
  province: Province;

  @OneToMany(() => Ward, (ward) => ward.constituency)
  wards: Ward[];
}
