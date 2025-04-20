import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialChatDto, UpdateSocialChatDto } from '../dto';
import { SocialChatService } from '../service';
import { SocialChatEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/chat')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialChatController {
  constructor(private readonly chatService: SocialChatService) {}

  @Post()
  @ApiOperation({ summary: 'Create a chat' })
  @ApiResponse({ status: 201, description: 'Chat created successfully.' })
  create(
    @Body() createDto: CreateSocialChatDto,
    @User('id') userId: number
  ) {
    return this.chatService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chats' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<SocialChatEntity>> {
    return this.chatService.findAll(paginationOptions, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get chat by id' })
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update chat' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialChatDto
  ) {
    return this.chatService.update(+id, updateDto);
  }

  @Patch(':id/last-message')
  @ApiOperation({ summary: 'Update chat last message time' })
  updateLastMessageTime(@Param('id') id: string) {
    return this.chatService.updateLastMessageTime(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete chat' })
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
