import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString } from 'class-validator';
import { CommonMetadata } from 'src/common/metadata/common';
import { ProvinceObj } from './province';

export class DistrictDto {
  @ApiProperty()
  @IsString()
  districtName: string;

  @ApiProperty({ type: () => ProvinceObj })
  @IsObject()
  @Type(() => ProvinceObj)
  province: ProvinceObj;
}

export class DistrictObj extends CommonMetadata implements DistrictDto {
  @ApiProperty()
  @IsString()
  districtName: string;

  @ApiProperty({ type: () => ProvinceObj })
  @IsObject()
  @Type(() => ProvinceObj)
  province: ProvinceObj;
}
