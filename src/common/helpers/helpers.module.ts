import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtService } from './jwt.service';
import { SmsService } from './sms.service';
import { EmailService } from './email.service';
import { FileService } from './file.service';
import { ValidationService } from './validation.service';

@Module({
  providers: [
    CommonService,
    JwtService,
    SmsService,
    EmailService,
    FileService,
    ValidationService,
  ],
  exports: [
    CommonService,
    JwtService,
    SmsService,
    EmailService,
    FileService,
    ValidationService,
  ],
})
export class HelpersModule {}