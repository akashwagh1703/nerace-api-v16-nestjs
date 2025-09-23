import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { HelpersModule } from '../../common/helpers/helpers.module';

@Module({
  imports: [
    HelpersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'nerace-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [TradeController],
  providers: [TradeService],
  exports: [TradeService],
})
export class TradeModule {}