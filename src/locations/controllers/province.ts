import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/Auth.Guard';
import { ProvinceDto, ProvinceObj } from '../interfaces/province';
import { ProvinceService } from '../services/province';

@Controller('province')
@ApiTags('Provinces')
export class ProvinceController {
  constructor(private readonly _provinceService: ProvinceService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all provinces',
    type: ProvinceObj,
    isArray: true,
  })
  async getProvinces(): Promise<ProvinceObj[]> {
    return this._provinceService.getProvinces();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get province by id',
    type: ProvinceObj,
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  async getProvinceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProvinceObj> {
    return this._provinceService.getProvinceById(id);
  }

  @Get('name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get province by name',
    type: ProvinceObj,
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  async getProvinceByName(@Param('name') name: string): Promise<ProvinceObj> {
    return this._provinceService.getProvinceByName(name);
  }

  @Get('district/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get province by district name',
    type: ProvinceObj,
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  async getProvinceByDistrictName(
    @Param('name') name: string,
  ): Promise<ProvinceObj> {
    return this._provinceService.getProvinceByDistrictName(name);
  }

  @Get('constituency/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get province by constituency name',
    type: ProvinceObj,
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  async getProvinceByConstituencyName(
    @Param('name') name: string,
  ): Promise<ProvinceObj> {
    return this._provinceService.getProvinceByConstituencyName(name);
  }

  @Get('ward/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get province by ward name',
    type: ProvinceObj,
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  async getProvinceByWardName(
    @Param('name') name: string,
  ): Promise<ProvinceObj> {
    return this._provinceService.getProvinceByWardName(name);
  }

  @UseGuards(JwtGuard)
  @Post()
  @ApiBody({
    type: ProvinceDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Create a province',
    type: ProvinceObj,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createProvince(@Body() province: ProvinceDto): Promise<ProvinceObj> {
    return this._provinceService.createProvince(province);
  }

  @UseGuards(JwtGuard)
  @Post('bulk')
  @ApiBody({
    type: ProvinceDto,
    isArray: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Create a province',
    type: ProvinceObj,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createProvinces(@Body() provinces: ProvinceDto[]) {
    return this._provinceService.createBulkProvinces(provinces);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({
    type: ProvinceObj,
  })
  @ApiResponse({
    status: 200,
    description: 'Update a province',
    type: ProvinceObj,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  async updateProvince(
    @Param('id', ParseIntPipe) id: number,
    @Body() province: ProvinceObj,
  ): Promise<ProvinceObj> {
    return this._provinceService.updateProvince(id, province);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Delete a province',
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  async deleteProvince(@Param('id', ParseIntPipe) id: number) {
    return this._provinceService.deleteProvince(id);
  }
}
