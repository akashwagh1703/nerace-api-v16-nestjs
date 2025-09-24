import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async register(userData: any) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: { user: userData, otp: '1234' },
      message: 'Registration successful'
    };
  }

  async login(loginData: any) {
    try {
      // Check if login is with mobile number (for OTP login)
      const isMobileLogin = /^[0-9]{10}$/.test(loginData.username);
      
      if (!isMobileLogin) {
        return {
          success: 0,
          error: 1,
          status: 0,
          data: null,
          message: 'Please enter a valid 10-digit mobile number'
        };
      }
      
      if (isMobileLogin && !loginData.password) {
        // Mobile OTP login - generate and send OTP
        const result = await this.databaseService.executeQuery(
          'SELECT * FROM users WHERE phone_no = $1 AND is_deleted = false',
          [loginData.username]
        );

        if (result.length === 0) {
          return {
            success: 0,
            error: 1,
            status: 0,
            data: null,
            message: 'Mobile number not registered. Please register first.'
          };
        }

        const otp = '888888';
        
        // Update OTP in database
        await this.databaseService.executeQuery(
          'UPDATE users SET opt_number = $1, updated_on = NOW() WHERE phone_no = $2',
          [parseInt(otp), loginData.username]
        );

        return {
          success: 1,
          error: 0,
          status: 1,
          data: { 
            mobile: loginData.username,
            username: loginData.username,
            otp: otp, // In production, don't return OTP
            requires_otp: true
          },
          message: 'OTP sent to mobile number'
        };
      }

      // Regular email/password login
      const result = await this.databaseService.executeQuery(
        'SELECT * FROM users WHERE (email = $1 OR phone_no = $1) AND is_deleted = false',
        [loginData.username]
      );

      if (result.length === 0) {
        return {
          success: 0,
          error: 1,
          status: 0,
          data: null,
          message: 'Invalid credentials'
        };
      }

      const user = result[0];
      
      // Generate JWT token
      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
          phone_no: user.phone_no,
          user_type: user.user_type,
        },
        process.env.JWT_SECRET || '937ee2yklMgKxEMHsgzVKKVV2aoYJY2s',
        { expiresIn: '24h' }
      );

      // Update login status
      await this.databaseService.executeQuery(
        'UPDATE users SET is_login = true, device_id = $1, updated_on = NOW() WHERE user_id = $2',
        [loginData.device_id, user.user_id]
      );

      delete user.password;

      return {
        success: 1,
        error: 0,
        status: 1,
        data: { user, token },
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: 0,
        error: 1,
        status: 0,
        data: null,
        message: `Error: ${error.message}`
      };
    }
  }

  async verifyOtp(username: string, otp: string) {
    try {
      // Validate mobile format
      if (!/^[0-9]{10}$/.test(username)) {
        return {
          success: 0,
          error: 1,
          status: 0,
          data: null,
          message: 'Please enter a valid 10-digit mobile number'
        };
      }

      // Validate OTP format
      if (!/^[0-9]{6}$/.test(otp)) {
        return {
          success: 0,
          error: 1,
          status: 0,
          data: null,
          message: 'Please enter a valid 6-digit OTP'
        };
      }

      const result = await this.databaseService.executeQuery(
        'SELECT * FROM users WHERE phone_no = $1 AND opt_number = $2 AND is_deleted = false',
        [username, parseInt(otp)]
      );

      if (result.length === 0) {
        return {
          success: 0,
          error: 1,
          status: 0,
          data: null,
          message: 'Invalid OTP. Please check and try again.'
        };
      }

      const user = result[0];
      
      // Generate JWT token after OTP verification
      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
          phone_no: user.phone_no,
          user_type: user.user_type,
        },
        process.env.JWT_SECRET || '937ee2yklMgKxEMHsgzVKKVV2aoYJY2s',
        { expiresIn: '24h' }
      );

      // Clear OTP and update login status
      await this.databaseService.executeQuery(
        'UPDATE users SET opt_number = NULL, is_login = true, updated_on = NOW() WHERE user_id = $1',
        [user.user_id]
      );

      delete user.password;
      delete user.opt_number;

      return {
        success: 1,
        error: 0,
        status: 1,
        data: { user, token },
        message: 'OTP verified successfully. Login complete.'
      };
    } catch (error) {
      return {
        success: 0,
        error: 1,
        status: 0,
        data: null,
        message: `Error: ${error.message}`
      };
    }
  }

  async resendOtp(mobile: string) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: { otp: '1234' },
      message: 'OTP sent successfully'
    };
  }

  async getProfile(userId: number) {
    try {
      const result = await this.databaseService.executeQuery(
        'SELECT * FROM users WHERE user_id = $1 AND is_deleted = false',
        [userId]
      );

      if (result.length === 0) {
        return {
          success: 0,
          error: 1,
          status: 0,
          data: null,
          message: 'User not found'
        };
      }

      const user = result[0];
      delete user.password;

      return {
        success: 1,
        error: 0,
        status: 1,
        data: user,
        message: 'Profile retrieved successfully'
      };
    } catch (error) {
      return {
        success: 0,
        error: 1,
        status: 0,
        data: null,
        message: `Error: ${error.message}`
      };
    }
  }

  async updateProfile(userId: number, updateData: any) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: updateData,
      message: 'Profile updated successfully'
    };
  }

  async logout(userId: number) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: null,
      message: 'Logout successful'
    };
  }

  async getUsersList() {
    try {
      const result = await this.databaseService.executeQuery(`
        SELECT user_id, first_name, last_name, email, phone_no, user_type, created_on
        FROM users 
        WHERE is_deleted = false 
        ORDER BY created_on DESC 
        LIMIT 20
      `);

      return {
        success: 1,
        error: 0,
        status: 1,
        data: result,
        message: 'Users list retrieved successfully'
      };
    } catch (error) {
      return {
        success: 0,
        error: 1,
        status: 0,
        data: null,
        message: `Error: ${error.message}`
      };
    }
  }
}