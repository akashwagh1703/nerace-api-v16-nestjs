import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.guard';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || '937ee2yklMgKxEMHsgzVKKVV2aoYJY2s',
      signOptions: { expiresIn: '24h' },
    }),
    HelpersModule,
  ],
  providers: [AuthService, JwtStrategy, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}