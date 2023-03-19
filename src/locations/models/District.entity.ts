import { AbstractClass } from 'src/common/metadata/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DistrictObj } from '../interfaces/district';
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
}
