import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString } from 'class-validator';
import { CommonMetadata } from 'src/common/metadata/common';
import { ProvinceObj } from './province';
import { WardObj } from './ward';

export class ConstituencyDto {
  @ApiProperty()
  @IsString()
  constituencyName: string;

  @ApiProperty({ type: () => ProvinceObj })
  @IsObject()
  @Type(() => ProvinceObj)
  province: ProvinceObj;
}

export class ConstituencyObj extends CommonMetadata {
  @ApiProperty()
  @IsString()
  constituencyName: string;

  @ApiProperty({ type: () => ProvinceObj })
  @IsObject()
  @Type(() => ProvinceObj)
  province: ProvinceObj;

  @ApiProperty({ type: () => [WardObj] })
  @IsObject()
  @Type(() => WardObj)
  wards: WardObj[];
}
