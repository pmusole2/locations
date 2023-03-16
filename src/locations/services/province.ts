import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinceDto, ProvinceObj } from '../interfaces/province';
import { Province } from '../models/Province.entity';

@Injectable()
export class ProvinceService {
  private readonly _logger: Logger = new Logger(ProvinceService.name);

  constructor(
    @InjectRepository(Province)
    private readonly _provinceRepo: Repository<Province>,
  ) {}

  async getProvinces(): Promise<Province[]> {
    return this._provinceRepo
      .createQueryBuilder('province')
      .leftJoinAndSelect('province.districts', 'district')
      .leftJoinAndSelect('district.constituencies', 'constituency')
      .leftJoinAndSelect('constituency.wards', 'ward')
      .getMany();
  }

  async getProvinceById(id: number): Promise<Province> {
    try {
      const province = await this._provinceRepo
        .createQueryBuilder('province')
        .leftJoinAndSelect('province.districts', 'district')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('province.id = :id', { id })
        .getOne();

      if (!province)
        throw new NotFoundException(`Province with id ${id} not found`);

      return province;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getProvinceByName(name: string): Promise<Province> {
    try {
      const province = await this._provinceRepo
        .createQueryBuilder('province')
        .leftJoinAndSelect('province.districts', 'district')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('province.provinceName = :name', { name })
        .getOne();

      if (!province)
        throw new NotFoundException(`Province with name ${name} not found`);

      return province;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getProvinceByDistrictName(name: string): Promise<Province> {
    try {
      const province = await this._provinceRepo
        .createQueryBuilder('province')
        .leftJoinAndSelect('province.districts', 'district')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('district.districtName = :name', { name })
        .getOne();

      if (!province)
        throw new NotFoundException(
          `Province with district name ${name} not found`,
        );

      return province;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getProvinceByConstituencyName(name: string): Promise<Province> {
    try {
      const province = await this._provinceRepo
        .createQueryBuilder('province')
        .leftJoinAndSelect('province.districts', 'district')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('constituency.constituencyName = :name', { name })
        .getOne();

      if (!province)
        throw new NotFoundException(
          `Province with constituency name ${name} not found`,
        );

      return province;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getProvinceByWardName(name: string): Promise<Province> {
    try {
      const province = await this._provinceRepo
        .createQueryBuilder('province')
        .leftJoinAndSelect('province.districts', 'district')
        .leftJoinAndSelect('district.constituencies', 'constituency')
        .leftJoinAndSelect('constituency.wards', 'ward')
        .where('ward.wardName = :name', { name })
        .getOne();

      if (!province)
        throw new NotFoundException(
          `Province with ward name ${name} not found`,
        );

      return province;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async createProvince(data: ProvinceDto): Promise<Province> {
    try {
      const oldProvince = await this._provinceRepo.findOneBy({
        provinceName: data.provinceName,
      });

      if (oldProvince)
        throw new BadRequestException(
          `Province with name ${data.provinceName} already exists`,
        );

      const province = await this._provinceRepo.create(data).save();
      return this.getProvinceById(province.id);
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async createBulkProvinces(data: ProvinceDto[]) {
    try {
      return await this._provinceRepo
        .createQueryBuilder('province')
        .insert()
        .values(data)
        .execute();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async updateProvince(
    id: number,
    data: Partial<ProvinceObj>,
  ): Promise<Province> {
    try {
      const province = await this.getProvinceById(id);

      await this._provinceRepo.update(id, {
        ...province,
        ...data,
      });

      return this.getProvinceById(id);
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async deleteProvince(id: number) {
    try {
      const province = await this.getProvinceById(id);
      return !!province.softRemove();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }
}
