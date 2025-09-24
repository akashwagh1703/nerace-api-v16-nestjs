import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmeetingController } from './emeeting.controller';
import { EmeetingService } from './emeeting.service';


@Module({
  imports: [

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'nerace-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [EmeetingController],
  providers: [EmeetingService],
  exports: [EmeetingService],
})
export class EmeetingModule {}
