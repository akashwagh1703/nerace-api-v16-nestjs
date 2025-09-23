import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';
import { Farm } from './entities/farm.entity';
import { HelpersModule } from '../../common/helpers/helpers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Farm]),
    HelpersModule,
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