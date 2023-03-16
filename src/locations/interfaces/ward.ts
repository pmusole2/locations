import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsObject } from 'class-validator';
import { CommonMetadata } from 'src/common/metadata/common';
import { ConstituencyObj } from './constituency';

export class WardDto {
  @ApiProperty()
  @IsString()
  wardName: string;

  @ApiProperty({ type: () => ConstituencyObj })
  @IsObject()
  @Type(() => ConstituencyObj)
  constituency: ConstituencyObj;
}

export class WardObj extends CommonMetadata implements WardDto {
  @ApiProperty()
  @IsString()
  wardName: string;

  @ApiProperty({ type: () => ConstituencyObj })
  @IsObject()
  @Type(() => ConstituencyObj)
  constituency: ConstituencyObj;
}
