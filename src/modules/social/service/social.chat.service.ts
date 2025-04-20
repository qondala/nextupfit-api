import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialChatDto, UpdateSocialChatDto } from '../dto';
import { SocialChatEntity } from '../entity';


@Injectable()
export class SocialChatService {
  constructor(
    @InjectRepository(SocialChatEntity)
    private readonly chatRepository: Repository<SocialChatEntity>,
  ) {}

  async create(createDto: CreateSocialChatDto, userId: number): Promise<SocialChatEntity> {
    const chat = this.chatRepository.create({
      ...createDto,
      userId,
      lastMessageAt: new Date(),
      createdAt: new Date()
    });
    return await this.chatRepository.save(chat);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId: number
  ): Promise<PaginatedResponseDto<SocialChatEntity>> {
    const queryBuilder = this.chatRepository.createQueryBuilder('chat')
      .where('chat.userId = :userId OR chat.recipientId = :userId', { userId })
      .orderBy('chat.lastMessageAt', 'DESC');

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

  async findOne(id: number): Promise<SocialChatEntity> {
    return await this.chatRepository.findOne({ where: { id } }) as SocialChatEntity;
  }

  async update(id: number, updateDto: UpdateSocialChatDto): Promise<SocialChatEntity> {
    await this.chatRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async updateLastMessageTime(id: number): Promise<SocialChatEntity> {
    await this.chatRepository.update(id, {
      lastMessageAt: new Date(),
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
