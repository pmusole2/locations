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
import { WardDto, WardObj } from '../interfaces/ward';
import { WardService } from '../services/ward';

@Controller('ward')
@ApiTags('Wards')
export class WardController {
  constructor(private readonly _wardService: WardService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all wards',
    type: WardObj,
    isArray: true,
  })
  async getWards(): Promise<WardObj[]> {
    return this._wardService.getWards();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get ward by id',
    type: WardObj,
  })
  @ApiResponse({
    status: 404,
    description: 'Ward not found',
  })
  async getWardById(@Param('id', ParseIntPipe) id: number): Promise<WardObj> {
    return this._wardService.getWardById(id);
  }

  @Get('name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get ward by name',
    type: WardObj,
  })
  @ApiResponse({
    status: 404,
    description: 'Ward not found',
  })
  async getWardByName(@Param('name') name: string): Promise<WardObj> {
    return this._wardService.getWardByName(name);
  }

  @Get('constituency/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get wards by constituency id',
    type: WardObj,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Wards not found',
  })
  async getWardsByConstituencyId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WardObj[]> {
    return this._wardService.getWardByConstituencyId(id);
  }

  @Get('constituency/name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get wards by constituency name',
    type: WardObj,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Wards not found',
  })
  async getWardsByConstituencyName(
    @Param('name') name: string,
  ): Promise<WardObj[]> {
    return this._wardService.getWardByConstituencyName(name);
  }

  @Get('district/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get wards by district id',
    type: WardObj,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Wards not found',
  })
  async getWardsByDistrictId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WardObj[]> {
    return this._wardService.getWardByDistrictId(id);
  }

  @Get('district/name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get wards by district name',
    type: WardObj,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Wards not found',
  })
  async getWardsByDistrictName(
    @Param('name') name: string,
  ): Promise<WardObj[]> {
    return this._wardService.getWardByDistrictName(name);
  }

  @Get('province/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Get wards by province id',
    type: WardObj,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Wards not found',
  })
  async getWardsByProvinceId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WardObj[]> {
    return this._wardService.getWardByProvinceId(id);
  }

  @Get('province/name/:name')
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Get wards by province name',
    type: WardObj,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Wards not found',
  })
  async getWardsByProvinceName(
    @Param('name') name: string,
  ): Promise<WardObj[]> {
    return this._wardService.getWardByProvinceName(name);
  }

  @UseGuards(JwtGuard)
  @Post()
  @ApiBody({ type: WardDto })
  @ApiResponse({
    status: 201,
    description: 'Create a new ward',
    type: WardObj,
  })
  async createWard(@Body() ward: WardDto): Promise<WardObj> {
    return this._wardService.createWard(ward);
  }

  @UseGuards(JwtGuard)
  @Post('bulk')
  @ApiBody({ type: [WardDto] })
  @ApiResponse({
    status: 201,
    description: 'Create new wards',
    type: WardObj,
    isArray: true,
  })
  async createWards(@Body() wards: WardDto[]) {
    return this._wardService.createBulkWard(wards);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: WardObj })
  @ApiResponse({
    status: 200,
    description: 'Update a ward',
    type: WardObj,
  })
  async updateWard(
    @Param('id', ParseIntPipe) id: number,
    @Body() ward: WardObj,
  ): Promise<WardObj> {
    return this._wardService.updateWard(id, ward);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Delete a ward',
  })
  async deleteWard(@Param('id', ParseIntPipe) id: number) {
    return this._wardService.deleteWard(id);
  }
}
