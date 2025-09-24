import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'nerace-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [FarmerController],
  providers: [FarmerService],
  exports: [FarmerService],
})
export class FarmerModule {}
