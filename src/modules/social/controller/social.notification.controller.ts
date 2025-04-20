import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialNotificationDto, UpdateSocialNotificationDto } from '../dto';
import { SocialNotificationService } from '../service';
import { SocialNotificationEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/notification')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialNotificationController {
  constructor(private readonly notificationService: SocialNotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a notification' })
  @ApiResponse({ status: 201, description: 'Notification created successfully.' })
  create(@Body() createDto: CreateSocialNotificationDto) {
    return this.notificationService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<SocialNotificationEntity>> {
    return this.notificationService.findAll(paginationOptions, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by id' })
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update notification' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialNotificationDto
  ) {
    return this.notificationService.update(+id, updateDto);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
