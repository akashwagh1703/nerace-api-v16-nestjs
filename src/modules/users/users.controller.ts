import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '../../common/auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP' })
  async verifyOtp(@Body() body: { mobile: string; otp: string }) {
    return this.usersService.verifyOtp(body.mobile, body.otp);
  }

  @Post('resend-otp')
  @ApiOperation({ summary: 'Resend OTP' })
  async resendOtp(@Body() body: { mobile: string }) {
    return this.usersService.resendOtp(body.mobile);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.user_id);
  }

  @Put('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(@Request() req, @Body() updateData: any) {
    return this.usersService.updateProfile(req.user.user_id, updateData);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User logout' })
  async logout(@Request() req) {
    return this.usersService.logout(req.user.user_id);
  }

  @Post('upload-profile-image')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('profile_image'))
  @ApiOperation({ summary: 'Upload profile image' })
  async uploadProfileImage(
    @Request() req,
    @UploadedFile() file: Express.Multer.File
  ) {
    // Handle file upload logic here
    const profileImagePath = `uploads/profiles/${file.filename}`;
    return this.usersService.updateProfile(req.user.user_id, { 
      profile_image: profileImagePath 
    });
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get user categories' })
  async getCategories() {
    // Return categories data
    return {
      success: 1,
      error: 0,
      status: 1,
      data: [],
      message: 'Categories retrieved successfully'
    };
  }

  @Get('master-data')
  @ApiOperation({ summary: 'Get master data' })
  async getMasterData() {
    // Return master data
    return {
      success: 1,
      error: 0,
      status: 1,
      data: {
        states: [],
        districts: [],
        crops: [],
        soil_types: [],
        irrigation_types: []
      },
      message: 'Master data retrieved successfully'
    };
  }
}