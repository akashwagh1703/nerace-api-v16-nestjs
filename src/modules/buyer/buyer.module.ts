import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { TradeProduct } from './entities/trade-product.entity';
import { Bid } from './entities/bid.entity';
import { Interest } from './entities/interest.entity';
import { Rating } from './entities/rating.entity';
import { HelpersModule } from '../../common/helpers/helpers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TradeProduct, Bid, Interest, Rating]),
    HelpersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'nerace-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [BuyerController],
  providers: [BuyerService],
  exports: [BuyerService],
})
export class BuyerModule {}