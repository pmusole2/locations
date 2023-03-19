import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstituencyDto, ConstituencyObj } from '../interfaces/constituency';
import { Constituency } from '../models/Constituency.entity';

@Injectable()
export class ConstituencyService {
  private readonly _logger: Logger = new Logger(ConstituencyService.name);
  constructor(
    @InjectRepository(Constituency)
    private readonly _constituencyRepo: Repository<Constituency>,
  ) {}

  async getConstituencies(): Promise<Constituency[]> {
    return this._constituencyRepo
      .createQueryBuilder('constituency')
      .leftJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect('province.districts', 'districts')
      .leftJoinAndSelect('constituency.wards', 'wards')
      .getMany();
  }

  async getConstituencyById(id: number): Promise<Constituency> {
    try {
      const constituency = await this._constituencyRepo
        .createQueryBuilder('constituency')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('province.districts', 'districts')
        .leftJoinAndSelect('constituency.wards', 'wards')
        .where('constituency.id = :id', { id })
        .getOne();

      if (!constituency)
        throw new NotFoundException(`Constituency with id ${id} not found`);

      return constituency;
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  async getConstituencyByName(name: string): Promise<Constituency> {
    try {
      const constituency = await this._constituencyRepo
        .createQueryBuilder('constituency')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('province.districts', 'districts')
        .leftJoinAndSelect('constituency.wards', 'wards')
        .where('constituency.constituencyName LIKE :name', {
          name: `%${name}%`,
        })
        .getOne();

      if (!constituency)
        throw new NotFoundException(`Constituency with name ${name} not found`);

      return constituency;
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  async getConstituencyByDistrictId(id: number): Promise<Constituency[]> {
    try {
      return await this._constituencyRepo
        .createQueryBuilder('constituency')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('province.districts', 'districts')
        .leftJoinAndSelect('constituency.wards', 'wards')
        .where('district.id = :id', { id })
        .getMany();
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  async getConstituencyByDistrictName(name: string): Promise<Constituency[]> {
    try {
      const constituency = await this._constituencyRepo
        .createQueryBuilder('constituency')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('province.districts', 'districts')
        .leftJoinAndSelect('constituency.wards', 'wards')
        .where('district.districtName LIKE :name', { name: `%${name}%` })
        .getMany();

      if (!constituency)
        throw new NotFoundException(
          `Constituency with dsitrict name ${name} not found`,
        );

      return constituency;
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  async getConstituencyByProvinceId(id: number): Promise<Constituency[]> {
    try {
      const constituency = await this._constituencyRepo
        .createQueryBuilder('constituency')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('province.districts', 'districts')
        .leftJoinAndSelect('constituency.wards', 'wards')
        .where('province.id = :id', { id })
        .getMany();

      if (!constituency)
        throw new NotFoundException(`Constituency with id ${id} not found`);

      return constituency;
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  async getConstituencyByProvinceName(name: string): Promise<Constituency[]> {
    try {
      const constituency = await this._constituencyRepo
        .createQueryBuilder('constituency')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('province.districts', 'districts')
        .leftJoinAndSelect('constituency.wards', 'wards')
        .where('province.provinceName LIKE :name', { name: `%${name}%` })
        .getMany();

      if (!constituency)
        throw new NotFoundException(`Constituency with name ${name} not found`);

      return constituency;
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  async createConstituency(data: ConstituencyDto): Promise<Constituency> {
    try {
      // Check if constituency already exists in the district
      const constituency = await this._constituencyRepo
        .createQueryBuilder('constituency')
        .where('constituency.constituencyName = :name', {
          name: data.constituencyName,
        })
        .andWhere('district.id = :id', { id: data.province.id })
        .getOne();

      if (constituency)
        throw new BadRequestException(
          `Constituency with name ${data.constituencyName} already exists in the district`,
        );

      const constituencyToCreate = await this._constituencyRepo
        .create(data)
        .save();

      return this.getConstituencyById(constituencyToCreate.id);
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  async createBulkConstituency(data: ConstituencyDto[]) {
    try {
      return await this._constituencyRepo
        .createQueryBuilder()
        .insert()
        .values(data)
        .execute();
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  async updateConstituency(
    id: number,
    data: Partial<ConstituencyObj>,
  ): Promise<Constituency> {
    try {
      const constituency = await this.getConstituencyById(id);

      await this._constituencyRepo.update(id, {
        ...constituency,
        ...data,
      });

      return this.getConstituencyById(id);
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }

  async deleteConstituency(id: number) {
    try {
      return !!(await this.getConstituencyById(id)).softRemove();
    } catch (error) {
      this._logger.log(error);
      throw error;
    }
  }
}
