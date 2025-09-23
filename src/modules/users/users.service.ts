import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CommonService } from '../../common/helpers/common.service';
import { JwtService } from '../../common/helpers/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private commonService: CommonService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { mobile: createUserDto.mobile }
      ]
    });

    if (existingUser) {
      throw new ConflictException('User already exists with this email or mobile');
    }

    // Hash password
    const hashedPassword = await this.commonService.hashPassword(createUserDto.password);

    // Generate referral code
    const referralCode = this.commonService.generateRandomString(8).toUpperCase();

    // Generate OTP
    const otp = this.commonService.generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      referral_code: referralCode,
      otp,
      otp_expiry: otpExpiry,
    });

    const savedUser = await this.userRepository.save(user);

    // Remove sensitive data
    delete savedUser.password;
    delete savedUser.otp;

    return this.commonService.successResponse(
      { user: savedUser, otp }, 
      'Registration successful. Please verify your mobile number.'
    );
  }

  async login(loginUserDto: LoginUserDto) {
    // Find user by email or mobile
    const user = await this.userRepository.findOne({
      where: [
        { email: loginUserDto.email_mobile },
        { mobile: loginUserDto.email_mobile }
      ]
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await this.commonService.verifyPassword(
      loginUserDto.password, 
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.is_verified) {
      throw new UnauthorizedException('Please verify your account first');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Your account is deactivated');
    }

    // Update device info
    if (loginUserDto.device_id) {
      user.device_id = loginUserDto.device_id;
    }
    if (loginUserDto.fcm_token) {
      user.fcm_token = loginUserDto.fcm_token;
    }
    await this.userRepository.save(user);

    // Generate JWT token
    const token = this.jwtService.generateToken({
      user_id: user.id,
      email: user.email,
      mobile: user.mobile,
      user_type: user.user_type,
    });

    // Remove sensitive data
    delete user.password;
    delete user.otp;

    return this.commonService.successResponse(
      { user, token },
      'Login successful'
    );
  }

  async verifyOtp(mobile: string, otp: string) {
    const user = await this.userRepository.findOne({ where: { mobile } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.otp !== otp || user.otp_expiry < new Date()) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Mark user as verified
    user.is_verified = true;
    user.otp = null;
    user.otp_expiry = null;
    await this.userRepository.save(user);

    return this.commonService.successResponse(null, 'OTP verified successfully');
  }

  async resendOtp(mobile: string) {
    const user = await this.userRepository.findOne({ where: { mobile } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate new OTP
    const otp = this.commonService.generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otp_expiry = otpExpiry;
    await this.userRepository.save(user);

    return this.commonService.successResponse(
      { otp },
      'OTP sent successfully'
    );
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({ 
      where: { id: userId, is_active: true, is_deleted: false } 
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.password;
    delete user.otp;

    return this.commonService.successResponse(user, 'Profile retrieved successfully');
  }

  async updateProfile(userId: number, updateData: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user data
    Object.assign(user, updateData);
    user.updated_by_id = userId;
    
    const updatedUser = await this.userRepository.save(user);
    delete updatedUser.password;
    delete updatedUser.otp;

    return this.commonService.successResponse(updatedUser, 'Profile updated successfully');
  }

  async logout(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (user) {
      user.fcm_token = null;
      user.device_id = null;
      await this.userRepository.save(user);
    }

    return this.commonService.successResponse(null, 'Logout successful');
  }
}