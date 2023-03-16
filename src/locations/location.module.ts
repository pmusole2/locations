import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstituencyController } from './controllers/constituency';
import { DistrictController } from './controllers/district';
import { ProvinceController } from './controllers/province';
import { WardController } from './controllers/ward';
import { Constituency } from './models/Constituency.entity';
import { District } from './models/District.entity';
import { Province } from './models/Province.entity';
import { Ward } from './models/Ward.entity';
import { ConstituencyService } from './services/constituency';
import { DistrictService } from './services/district';
import { ProvinceService } from './services/province';
import { WardService } from './services/ward';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Constituency, Ward])],
  controllers: [
    ProvinceController,
    DistrictController,
    ConstituencyController,
    WardController,
  ],
  providers: [
    ProvinceService,
    DistrictService,
    ConstituencyService,
    WardService,
  ],
})
export class LocationModule {}
