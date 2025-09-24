import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(payload: any): Promise<any> {
    // Validate user from database
    return payload;
  }

  async login(user: any) {
    const payload = { 
      user_id: user.id, 
      email: user.email, 
      user_type: user.user_type 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
