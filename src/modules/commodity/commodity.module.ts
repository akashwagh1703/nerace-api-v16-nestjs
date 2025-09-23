import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CommodityController } from './commodity.controller';
import { CommodityService } from './commodity.service';
import { Commodity } from './entities/commodity.entity';
import { CommodityPrice } from './entities/commodity-price.entity';
import { HelpersModule } from '../../common/helpers/helpers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commodity, CommodityPrice]),
    HelpersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'nerace-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [CommodityController],
  providers: [CommodityService],
  exports: [CommodityService],
})
export class CommodityModule {}