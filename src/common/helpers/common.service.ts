import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class CommonService {
  
  // Generate OTP
  generateOtp(length: number = 6): string {
    return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
  }

  // Hash password
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Encrypt string
  encryptString(text: string, key: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  // Decrypt string
  decryptString(encryptedText: string, key: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  // Generate random string
  generateRandomString(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  // Format API response
  formatResponse(success: number, error: number, status: number, data: any, message: string) {
    return {
      success,
      error,
      status,
      data,
      message
    };
  }

  // Success response
  successResponse(data: any, message: string = 'Success') {
    return this.formatResponse(1, 0, 1, data, message);
  }

  // Error response
  errorResponse(message: string = 'Error occurred', data: any = null) {
    return this.formatResponse(0, 1, 0, data, message);
  }

  // Validate mobile number
  validateMobile(mobile: string): boolean {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  }

  // Validate email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Get current timestamp
  getCurrentTimestamp(): Date {
    return new Date();
  }

  // Format date
  formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    switch (format) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'DD-MM-YYYY':
        return `${day}-${month}-${year}`;
      default:
        return `${year}-${month}-${day}`;
    }
  }

  // Clean text input
  cleanText(text: string): string {
    return text.trim().replace(/[<>]/g, '');
  }

  // Generate unique filename
  generateUniqueFilename(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const extension = originalName.split('.').pop();
    return `${timestamp}_${random}.${extension}`;
  }

  // Calculate distance between coordinates
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
