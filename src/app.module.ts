import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Modules
import { UsersModule } from './modules/users/users.module';
import { BuyerModule } from './modules/buyer/buyer.module';
import { CommodityModule } from './modules/commodity/commodity.module';
import { FarmerModule } from './modules/farmer/farmer.module';
import { ChatModule } from './modules/chat/chat.module';
import { EmeetingModule } from './modules/emeeting/emeeting.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PaymentModule } from './modules/payment/payment.module';
import { TeamModule } from './modules/team/team.module';
import { TradeModule } from './modules/trade/trade.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { MasterModule } from './modules/master/master.module';
import { TestModule } from './modules/test/test.module';

// Common modules
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || '937ee2yklMgKxEMHsgzVKKVV2aoYJY2s',
      signOptions: { expiresIn: '24h' },
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    BuyerModule,
    CommodityModule,
    FarmerModule,
    ChatModule,
    EmeetingModule,
    NotificationModule,
    PaymentModule,
    TeamModule,
    TradeModule,
    VendorModule,
    MasterModule,
    TestModule,
  ],
})
export class AppModule {}
