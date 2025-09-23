import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FarmerService } from './farmer.service';
import { AuthGuard } from '../../common/auth/auth.guard';

@ApiTags('Farmer')
@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Get('farms')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get farmer farms' })
  async getFarms(@Request() req) {
    return this.farmerService.getFarms(req.user.user_id);
  }

  @Post('add-farm')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add new farm' })
  async addFarm(@Request() req, @Body() farmData: any) {
    return this.farmerService.addFarm(req.user.user_id, farmData);
  }
}