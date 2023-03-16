import { AbstractClass } from 'src/common/metadata/common';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DistrictObj } from '../interfaces/district';
import { Constituency } from './Constituency.entity';
import { Province } from './Province.entity';

@Entity('district')
export class District extends AbstractClass implements DistrictObj {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  districtName: string;

  @ManyToOne(() => Province, (province) => province.districts)
  province: Province;

  @OneToMany(() => Constituency, (constituency) => constituency.district)
  constituencies: Constituency[];
}
