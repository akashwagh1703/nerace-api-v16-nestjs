import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', '10.48.36.100'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'Supp0rt@123'),
        database: configService.get('DB_DATABASE', 'nerace'),
        entities: [User],
        synchronize: false,
        logging: configService.get('NODE_ENV') === 'development',
        ssl: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}