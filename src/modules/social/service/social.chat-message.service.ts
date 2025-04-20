import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialChatMessageDto, UpdateSocialChatMessageDto } from '../dto';
import { SocialChatMessageEntity } from '../entity';


@Injectable()
export class SocialChatMessageService {
  constructor(
    @InjectRepository(SocialChatMessageEntity)
    private readonly chatMessageRepository: Repository<SocialChatMessageEntity>,
  ) {}

  async create(createDto: CreateSocialChatMessageDto, senderId: number): Promise<SocialChatMessageEntity> {
    const chatMessage = this.chatMessageRepository.create({
      ...createDto,
      senderId,
      isRead: false,
      createdAt: new Date()
    });
    return await this.chatMessageRepository.save(chatMessage);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    chatId: number
  ): Promise<PaginatedResponseDto<SocialChatMessageEntity>> {
    const queryBuilder = this.chatMessageRepository.createQueryBuilder('chatMessage')
      .where('chatMessage.chatId = :chatId', { chatId })
      .orderBy('chatMessage.createdAt', 'DESC');

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page
      }
    };
  }

  async findOne(id: number): Promise<SocialChatMessageEntity> {
    return await this.chatMessageRepository.findOne({ where: { id } }) as SocialChatMessageEntity;
  }

  async update(id: number, updateDto: UpdateSocialChatMessageDto): Promise<SocialChatMessageEntity> {
    await this.chatMessageRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async markAsRead(id: number): Promise<SocialChatMessageEntity> {
    await this.chatMessageRepository.update(id, {
      isRead: true,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.chatMessageRepository.delete(id);
  }
}
