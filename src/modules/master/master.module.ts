import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';
import { State } from './entities/state.entity';
import { District } from './entities/district.entity';
import { Crop } from './entities/crop.entity';
import { CropVariety } from './entities/crop-variety.entity';
import { SoilType } from './entities/soil-type.entity';
import { IrrigationType } from './entities/irrigation-type.entity';
import { HelpersModule } from '../../common/helpers/helpers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      State, 
      District, 
      Crop, 
      CropVariety, 
      SoilType, 
      IrrigationType
    ]),
    HelpersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'nerace-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [MasterController],
  providers: [MasterService],
  exports: [MasterService],
})
export class MasterModule {}