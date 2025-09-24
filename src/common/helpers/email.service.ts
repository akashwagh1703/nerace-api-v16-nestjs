import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@nerace.com',
        to,
        subject,
        html,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const subject = 'Welcome to Nerace - Agricultural Trading Platform';
    const html = `
      <h2>Welcome to Nerace, ${name}!</h2>
      <p>Thank you for joining our agricultural trading platform.</p>
      <p>Start exploring and connect with farmers and buyers across the region.</p>
      <p>Best regards,<br>Nerace Team</p>
    `;
    return this.sendEmail(email, subject, html);
  }

  async sendOtpEmail(email: string, otp: string): Promise<boolean> {
    const subject = 'Nerace - Email Verification OTP';
    const html = `
      <h2>Email Verification</h2>
      <p>Your OTP for email verification is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 10 minutes.</p>
      <p>Best regards,<br>Nerace Team</p>
    `;
    return this.sendEmail(email, subject, html);
  }

  async sendPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
    const subject = 'Nerace - Password Reset Request';
    const html = `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link is valid for 1 hour.</p>
      <p>Best regards,<br>Nerace Team</p>
    `;
    return this.sendEmail(email, subject, html);
  }
}
