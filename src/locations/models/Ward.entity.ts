import { AbstractClass } from 'src/common/metadata/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { WardObj } from '../interfaces/ward';
import { Constituency } from './Constituency.entity';

@Entity('ward')
export class Ward extends AbstractClass implements WardObj {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  wardName: string;

  @ManyToOne(() => Constituency, (constituency) => constituency.wards)
  constituency: Constituency;
}
