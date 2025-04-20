import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialChatMessageTextDto, UpdateSocialChatMessageTextDto } from '../dto';
import { SocialChatMessageTextService } from '../service';
import { SocialChatMessageTextEntity } from '../entity';


@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/chat/message-text')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialChatMessageTextController {
  constructor(private readonly chatMessageTextService: SocialChatMessageTextService) {}

  @Post('message/:messageId')
  @ApiOperation({ summary: 'Create a chat message text' })
  @ApiResponse({ status: 201, description: 'Chat message text created successfully.' })
  create(
    @Body() createDto: CreateSocialChatMessageTextDto,
    @Param('messageId') messageId: string
  ) {
    return this.chatMessageTextService.create(createDto, +messageId);
  }

  @Get('message/:messageId')
  @ApiOperation({ summary: 'Get all texts for a message' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @Param('messageId') messageId: string
  ): Promise<PaginatedResponseDto<SocialChatMessageTextEntity>> {
    return this.chatMessageTextService.findAll(paginationOptions, +messageId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get chat message text by id' })
  findOne(@Param('id') id: string) {
    return this.chatMessageTextService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update chat message text' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialChatMessageTextDto
  ) {
    return this.chatMessageTextService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete chat message text' })
  remove(@Param('id') id: string) {
    return this.chatMessageTextService.remove(+id);
  }
}
