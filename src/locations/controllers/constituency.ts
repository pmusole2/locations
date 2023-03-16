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
import { ConstituencyDto, ConstituencyObj } from '../interfaces/constituency';
import { ConstituencyService } from '../services/constituency';

@Controller('constituency')
@ApiTags('Constituencies')
export class ConstituencyController {
  constructor(private readonly _constituencyService: ConstituencyService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all constituencies',
    type: ConstituencyObj,
    isArray: true,
  })
  async getConstituencies(): Promise<ConstituencyObj[]> {
    return this._constituencyService.getConstituencies();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get constituency by id',
    type: ConstituencyObj,
  })
  @ApiResponse({
    status: 404,
    description: 'Constituency not found',
  })
  async getConstituencyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConstituencyObj> {
    return this._constituencyService.getConstituencyById(id);
  }

  @Get('name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get constituency by name',
    type: ConstituencyObj,
  })
  @ApiResponse({
    status: 404,
    description: 'Constituency not found',
  })
  async getConstituencyByName(
    @Param('name') name: string,
  ): Promise<ConstituencyObj> {
    return this._constituencyService.getConstituencyByName(name);
  }

  @Get('district/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get constituencies by district id',
    type: ConstituencyObj,
    isArray: true,
  })
  async getConstituenciesByDistrictId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConstituencyObj[]> {
    return this._constituencyService.getConstituencyByDistrictId(id);
  }

  @Get('district/name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get constituencies by district name',
    type: ConstituencyObj,
    isArray: true,
  })
  async getConstituenciesByDistrictName(
    @Param('name') name: string,
  ): Promise<ConstituencyObj[]> {
    return this._constituencyService.getConstituencyByDistrictName(name);
  }

  @Get('province/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get constituencies by province id',
    type: ConstituencyObj,
    isArray: true,
  })
  async getConstituenciesByProvinceId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConstituencyObj[]> {
    return this._constituencyService.getConstituencyByProvinceId(id);
  }

  @Get('province/name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get constituencies by province name',
    type: ConstituencyObj,
  })
  async getConstituenciesByProvinceName(
    @Param('name') name: string,
  ): Promise<ConstituencyObj[]> {
    return this._constituencyService.getConstituencyByProvinceName(name);
  }

  @Post()
  @ApiBody({ type: ConstituencyDto })
  @ApiResponse({
    status: 201,
    description: 'Create constituency',
    type: ConstituencyObj,
  })
  async createConstituency(
    @Body() constituency: ConstituencyDto,
  ): Promise<ConstituencyObj> {
    return this._constituencyService.createConstituency(constituency);
  }

  @Post('bulk')
  @ApiBody({ type: [ConstituencyDto] })
  @ApiResponse({
    status: 201,
    description: 'Create constituencies',
    type: ConstituencyObj,
    isArray: true,
  })
  async createConstituencies(@Body() constituencies: ConstituencyDto[]) {
    return this._constituencyService.createBulkConstituency(constituencies);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: ConstituencyObj })
  @ApiResponse({
    status: 200,
    description: 'Update constituency',
    type: ConstituencyObj,
  })
  async updateConstituency(
    @Param('id', ParseIntPipe) id: number,
    @Body() constituency: ConstituencyObj,
  ): Promise<ConstituencyObj> {
    return this._constituencyService.updateConstituency(id, constituency);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Delete constituency',
  })
  async deleteConstituency(@Param('id', ParseIntPipe) id: number) {
    return this._constituencyService.deleteConstituency(id);
  }
}
