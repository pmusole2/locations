import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString } from 'class-validator';
import { CommonMetadata } from 'src/common/metadata/common';
import { DistrictObj } from './district';
import { WardObj } from './ward';

export class ConstituencyDto {
  @ApiProperty()
  @IsString()
  constituencyName: string;

  @ApiProperty({ type: () => DistrictObj })
  @IsObject()
  @Type(() => DistrictObj)
  district: DistrictObj;
}

export class ConstituencyObj extends CommonMetadata {
  @ApiProperty()
  @IsString()
  constituencyName: string;

  @ApiProperty({ type: () => DistrictObj })
  @IsObject()
  @Type(() => DistrictObj)
  district: DistrictObj;

  @ApiProperty({ type: () => [WardObj] })
  @IsObject()
  @Type(() => WardObj)
  wards: WardObj[];
}
