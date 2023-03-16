import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistrictDto, DistrictObj } from '../interfaces/district';
import { District } from '../models/District.entity';

@Injectable()
export class DistrictService {
  private readonly _logger: Logger = new Logger(DistrictService.name);

  constructor(
    @InjectRepository(District)
    private readonly _districtRepo: Repository<District>,
  ) {}

  async getDistricts(): Promise<District[]> {
    return this._districtRepo
      .createQueryBuilder('district')
      .leftJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect('district.constituencies', 'constituency')
      .leftJoinAndSelect('constituency.wards', 'ward')
      .getMany();
  }

  async getDistrictById(id: number): Promise<District> {
    try {
      const district = await this._districtRepo
        .createQueryBuilder('district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('district.id = :id', { id })
        .getOne();

      if (!district)
        throw new NotFoundException(`District with id ${id} not found`);

      return district;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getDistrictByName(name: string): Promise<District> {
    try {
      const district = await this._districtRepo
        .createQueryBuilder('district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('district.districtName = :name', { name })
        .getOne();

      if (!district)
        throw new NotFoundException(`District with name ${name} not found`);

      return district;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getDistrictByProvinceId(id: number): Promise<District[]> {
    try {
      return await this._districtRepo
        .createQueryBuilder('district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('district.provinceId = :id', { id })
        .getMany();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getDistrictByProvinceName(name: string): Promise<District[]> {
    try {
      const district = await this._districtRepo
        .createQueryBuilder('district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('district.provinceName LIKE :name', { name: `%${name}%` })
        .getMany();

      if (!district)
        throw new NotFoundException(`District with name ${name} not found`);

      return district;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getDistrictByProvinceIdAndName(
    id: number,
    name: string,
  ): Promise<District> {
    try {
      const district = await this._districtRepo
        .createQueryBuilder('district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('district.provinceId = :id', { id })
        .andWhere('district.districtName = :name', { name })
        .getOne();

      if (!district)
        throw new NotFoundException(
          `District with id ${id} and name ${name} not found`,
        );

      return district;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async createDistrict(data: DistrictDto): Promise<District> {
    try {
      const district = await this._districtRepo
        .createQueryBuilder('district')
        .where('district.districtName = :name', { name: data.districtName })
        .andWhere('district.provinceId = :id', { id: data.province.id })
        .getOne();

      if (district)
        throw new BadRequestException(
          `District with name ${data.districtName} already exists`,
        );

      const newDistrict = await this._districtRepo.create(data).save();

      return this.getDistrictById(newDistrict.id);
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async createBulkDistricts(data: DistrictDto[]) {
    try {
      return await this._districtRepo
        .createQueryBuilder()
        .insert()
        .values(data)
        .execute();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async updateDistrict(
    id: number,
    data: Partial<DistrictObj>,
  ): Promise<District> {
    try {
      const district = await this.getDistrictById(id);

      await this._districtRepo.update(id, {
        ...district,
        ...data,
      });

      return this.getDistrictById(id);
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async deleteDistrict(id: number) {
    try {
      const district = await this.getDistrictById(id);

      return !!district.softRemove();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }
}
