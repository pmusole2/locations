import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { CommonMetadata } from 'src/common/metadata/common';
import { DistrictObj } from './district';

export class ProvinceDto {
  @ApiProperty()
  @IsString()
  provinceName: string;
}

export class ProvinceObj extends CommonMetadata implements ProvinceDto {
  @ApiProperty()
  @IsString()
  provinceName: string;

  @ApiProperty({ type: () => [DistrictObj] })
  @IsArray()
  @Type(() => DistrictObj)
  districts: DistrictObj[];
}
