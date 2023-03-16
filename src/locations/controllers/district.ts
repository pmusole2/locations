import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DistrictDto, DistrictObj } from '../interfaces/district';
import { DistrictService } from '../services/district';

@Controller('district')
@ApiTags('Districts')
export class DistrictController {
  constructor(private readonly _districtService: DistrictService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all districts',
    type: DistrictObj,
    isArray: true,
  })
  async getDistricts(): Promise<DistrictObj[]> {
    return this._districtService.getDistricts();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get district by id',
    type: DistrictObj,
  })
  @ApiResponse({
    status: 404,
    description: 'District not found',
  })
  async getDistrictById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DistrictObj> {
    return this._districtService.getDistrictById(id);
  }

  @Get('name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get district by name',
    type: DistrictObj,
  })
  @ApiResponse({
    status: 404,
    description: 'District not found',
  })
  async getDistrictByName(@Param('name') name: string): Promise<DistrictObj> {
    return this._districtService.getDistrictByName(name);
  }

  @Get('province/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get districts by province id',
    type: DistrictObj,
    isArray: true,
  })
  async getDistrictsByProvinceId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DistrictObj[]> {
    return this._districtService.getDistrictByProvinceId(id);
  }

  @Get('province/name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get districts by province name',
    type: DistrictObj,
    isArray: true,
  })
  async getDistrictsByProvinceName(
    @Param('name') name: string,
  ): Promise<DistrictObj[]> {
    return this._districtService.getDistrictByProvinceName(name);
  }

  @Get('province/query/:id/:name')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get districts by province id and name',
    type: DistrictObj,
  })
  @ApiResponse({
    status: 404,
    description: 'District not found',
  })
  async getDistrictsByProvinceIdAndName(
    @Param('id', ParseIntPipe) id: number,
    @Param('name') name: string,
  ): Promise<DistrictObj> {
    return this._districtService.getDistrictByProvinceIdAndName(id, name);
  }

  @Post()
  @ApiBody({ type: DistrictDto })
  @ApiResponse({
    status: 201,
    description: 'Create district',
    type: DistrictObj,
  })
  async createDistrict(@Body() district: DistrictDto): Promise<DistrictObj> {
    return this._districtService.createDistrict(district);
  }

  @Post('bulk')
  @ApiBody({ type: DistrictDto, isArray: true })
  @ApiResponse({
    status: 201,
    description: 'Create districts',
    type: DistrictObj,
    isArray: true,
  })
  async createDistricts(@Body() districts: DistrictDto[]) {
    return this._districtService.createBulkDistricts(districts);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: DistrictObj })
  @ApiResponse({
    status: 200,
    description: 'Update district',
    type: DistrictObj,
  })
  async updateDistrict(
    @Param('id', ParseIntPipe) id: number,
    @Body() district: Partial<DistrictObj>,
  ): Promise<DistrictObj> {
    return this._districtService.updateDistrict(id, district);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Delete district',
  })
  async deleteDistrict(@Param('id', ParseIntPipe) id: number) {
    return this._districtService.deleteDistrict(id);
  }
}
