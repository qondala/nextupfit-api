import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialChatMessageDto, UpdateSocialChatMessageDto } from '../dto';
import { SocialChatMessageService } from '../service';
import { SocialChatMessageEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/chat/message')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialChatMessageController {
  constructor(private readonly chatMessageService: SocialChatMessageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a chat message' })
  @ApiResponse({ status: 201, description: 'Chat message created successfully.' })
  create(
    @Body() createDto: CreateSocialChatMessageDto,
    @User('id') userId: number
  ) {
    return this.chatMessageService.create(createDto, userId);
  }

  @Get('chat/:chatId')
  @ApiOperation({ summary: 'Get all messages for a chat' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @Param('chatId') chatId: string
  ): Promise<PaginatedResponseDto<SocialChatMessageEntity>> {
    return this.chatMessageService.findAll(paginationOptions, +chatId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get chat message by id' })
  findOne(@Param('id') id: string) {
    return this.chatMessageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update chat message' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialChatMessageDto
  ) {
    return this.chatMessageService.update(+id, updateDto);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark chat message as read' })
  markAsRead(@Param('id') id: string) {
    return this.chatMessageService.markAsRead(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete chat message' })
  remove(@Param('id') id: string) {
    return this.chatMessageService.remove(+id);
  }
}
