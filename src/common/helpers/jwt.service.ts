import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey = process.env.JWT_SECRET || '937ee2yklMgKxEMHsgzVKKVV2aoYJY2s';

  // Generate JWT token
  generateToken(payload: any, expiresIn: string = '24h'): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  // Verify JWT token
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Decode JWT token without verification
  decodeToken(token: string): any {
    return jwt.decode(token);
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as any;
      if (!decoded || !decoded.exp) return true;
      
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // Refresh token
  refreshToken(token: string, expiresIn: string = '24h'): string {
    const decoded = this.verifyToken(token);
    delete decoded.iat;
    delete decoded.exp;
    return this.generateToken(decoded, expiresIn);
  }
}