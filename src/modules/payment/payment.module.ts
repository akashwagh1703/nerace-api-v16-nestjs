import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';


@Module({
  imports: [

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'nerace-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
