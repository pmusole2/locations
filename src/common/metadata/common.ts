import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CommonMetadata {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  deletedAt: Date | null;
}

export class AbstractClass extends BaseEntity implements CommonMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
