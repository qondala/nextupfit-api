import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialAffiliateSaleDto, UpdateSocialAffiliateSaleDto } from '../dto';
import { SocialAffiliateSaleService } from '../service';
import { SocialAffiliateSaleEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/affiliate/sale')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialAffiliateSaleController {
  constructor(private readonly affiliateSaleService: SocialAffiliateSaleService) {}

  @Post()
  @ApiOperation({ summary: 'Create an affiliate sale' })
  @ApiResponse({ status: 201, description: 'Affiliate sale created successfully.' })
  create(@Body() createDto: CreateSocialAffiliateSaleDto) {
    return this.affiliateSaleService.create(createDto);
  }

  @Get('as-buyer')
  @ApiOperation({ summary: 'Get all affiliate sales as buyer' })
  async findAllAsBuyer(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<SocialAffiliateSaleEntity>> {
    return this.affiliateSaleService.findAll(paginationOptions, userId, false);
  }

  @Get('as-seller')
  @ApiOperation({ summary: 'Get all affiliate sales as seller' })
  async findAllAsSeller(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<SocialAffiliateSaleEntity>> {
    return this.affiliateSaleService.findAll(paginationOptions, userId, true);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get affiliate sale by id' })
  findOne(@Param('id') id: string) {
    return this.affiliateSaleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update affiliate sale' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialAffiliateSaleDto
  ) {
    return this.affiliateSaleService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete affiliate sale' })
  remove(@Param('id') id: string) {
    return this.affiliateSaleService.remove(+id);
  }
}
