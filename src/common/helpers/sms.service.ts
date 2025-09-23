import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsService {
  private readonly smsConfig = {
    login_id: process.env.SMS_LOGIN_ID || 't1spochub',
    password: process.env.SMS_PASSWORD || 'EsdsSupp0rt@123',
    sender_id: process.env.SMS_SENDER_ID || 'OTPSMS',
    route_id: process.env.SMS_ROUTE_ID || '2',
    unicode: process.env.SMS_UNICODE || '0',
    url: process.env.SMS_URL || 'http://hindit.co.in/API/pushsms.aspx'
  };

  async sendSms(mobile: string, message: string): Promise<boolean> {
    try {
      const params = {
        loginid: this.smsConfig.login_id,
        password: this.smsConfig.password,
        mobile: mobile,
        text: message,
        senderid: this.smsConfig.sender_id,
        route_id: this.smsConfig.route_id,
        unicode: this.smsConfig.unicode
      };

      const response = await axios.get(this.smsConfig.url, { params });
      return response.status === 200;
    } catch (error) {
      console.error('SMS sending failed:', error);
      return false;
    }
  }

  async sendOtp(mobile: string, otp: string): Promise<boolean> {
    const message = `Your OTP for Nerace verification is: ${otp}. Valid for 10 minutes.`;
    return this.sendSms(mobile, message);
  }

  async sendWelcomeMessage(mobile: string, name: string): Promise<boolean> {
    const message = `Welcome to Nerace, ${name}! Start your agricultural trading journey with us.`;
    return this.sendSms(mobile, message);
  }

  async sendTransactionAlert(mobile: string, amount: number, type: string): Promise<boolean> {
    const message = `Transaction Alert: ${type} of Rs.${amount} processed successfully on Nerace.`;
    return this.sendSms(mobile, message);
  }
}