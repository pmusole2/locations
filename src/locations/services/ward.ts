import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WardDto, WardObj } from '../interfaces/ward';
import { Ward } from '../models/Ward.entity';

@Injectable()
export class WardService {
  private readonly _logger: Logger = new Logger(WardService.name);

  constructor(
    @InjectRepository(Ward)
    private readonly _wardRepo: Repository<Ward>,
  ) {}

  async getWards(): Promise<Ward[]> {
    return this._wardRepo
      .createQueryBuilder('ward')
      .leftJoinAndSelect('ward.constituency', 'constituency')
      .leftJoinAndSelect('constituency.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .getMany();
  }

  async getWardById(id: number): Promise<Ward> {
    try {
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .leftJoinAndSelect('constituency.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .where('ward.id = :id', { id })
        .getOne();

      if (!ward) throw new NotFoundException(`Ward with id ${id} not found`);

      return ward;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getWardByName(name: string): Promise<Ward> {
    try {
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .leftJoinAndSelect('constituency.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .where('ward.wardName LIKE :name', { name: `%${name}%` })
        .getOne();

      if (!ward)
        throw new NotFoundException(`Ward with name ${name} not found`);

      return ward;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getWardByConstituencyId(id: number): Promise<Ward[]> {
    try {
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .leftJoinAndSelect('constituency.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .where('constituency.id = :id', { id })
        .getMany();

      if (!ward) throw new NotFoundException(`Ward with id ${id} not found`);

      return ward;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getWardByConstituencyName(name: string): Promise<Ward[]> {
    try {
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .leftJoinAndSelect('constituency.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .where('constituency.constituencyName LIKE :name', {
          name: `%${name}%`,
        })
        .getMany();

      if (!ward)
        throw new NotFoundException(`Ward with name ${name} not found`);

      return ward;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getWardByDistrictId(id: number): Promise<Ward[]> {
    try {
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .leftJoinAndSelect('constituency.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .where('district.id = :id', { id })
        .getMany();

      if (!ward) throw new NotFoundException(`Ward with id ${id} not found`);

      return ward;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getWardByDistrictName(name: string): Promise<Ward[]> {
    try {
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .leftJoinAndSelect('constituency.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .where('district.districtName LIKE :name', {
          name: `%${name}%`,
        })
        .getMany();

      if (!ward)
        throw new NotFoundException(`Ward with name ${name} not found`);

      return ward;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getWardByProvinceId(id: number): Promise<Ward[]> {
    try {
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .leftJoinAndSelect('constituency.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .where('province.id = :id', { id })
        .getMany();

      if (!ward) throw new NotFoundException(`Ward with id ${id} not found`);

      return ward;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async getWardByProvinceName(name: string): Promise<Ward[]> {
    try {
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .leftJoinAndSelect('constituency.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .where('province.provinceName LIKE :name', {
          name: `%${name}%`,
        })
        .getMany();

      if (!ward)
        throw new NotFoundException(`Ward with name ${name} not found`);

      return ward;
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async createWard(data: WardDto): Promise<Ward> {
    try {
      // Check if ward already exists in the constituency
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .where('constituency.id = :id', { id: data.constituency.id })
        .andWhere('ward.wardName = :name', { name: data.wardName })
        .getOne();

      if (ward) throw new BadRequestException(`Ward already exists`);

      const newWard = await this._wardRepo.create(data).save();

      return await this.getWardById(newWard.id);
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async createBulkWard(data: WardDto[]) {
    try {
      return await this._wardRepo
        .createQueryBuilder()
        .insert()
        .values(data)
        .execute();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async updateWard(id: number, data: WardObj): Promise<Ward> {
    try {
      const ward = await this._wardRepo
        .createQueryBuilder('ward')
        .leftJoinAndSelect('ward.constituency', 'constituency')
        .where('ward.id = :id', { id })
        .getOne();

      if (!ward) throw new NotFoundException(`Ward with id ${id} not found`);

      await this._wardRepo.update(id, {
        ...ward,
        ...data,
      });

      return await this.getWardById(id);
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }

  async deleteWard(id: number) {
    try {
      return !!(await this.getWardById(id)).softRemove();
    } catch (error) {
      this._logger.error(error);
      throw error;
    }
  }
}
