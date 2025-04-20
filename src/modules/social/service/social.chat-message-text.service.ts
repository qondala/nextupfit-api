import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialChatMessageTextDto, UpdateSocialChatMessageTextDto } from '../dto';
import { SocialChatMessageTextEntity } from '../entity';


@Injectable()
export class SocialChatMessageTextService {
  constructor(
    @InjectRepository(SocialChatMessageTextEntity)
    private readonly chatMessageTextRepository: Repository<SocialChatMessageTextEntity>,
  ) {}

  async create(createDto: CreateSocialChatMessageTextDto, messageId: number): Promise<SocialChatMessageTextEntity> {
    const chatMessageText = this.chatMessageTextRepository.create({
      ...createDto,
      messageId,
      createdAt: new Date()
    });
    return await this.chatMessageTextRepository.save(chatMessageText);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    messageId: number
  ): Promise<PaginatedResponseDto<SocialChatMessageTextEntity>> {
    const queryBuilder = this.chatMessageTextRepository.createQueryBuilder('chatMessageText')
      .where('chatMessageText.messageId = :messageId', { messageId })
      .orderBy('chatMessageText.createdAt', 'DESC');

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

  async findOne(id: number): Promise<SocialChatMessageTextEntity> {
    return await this.chatMessageTextRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateDto: UpdateSocialChatMessageTextDto): Promise<SocialChatMessageTextEntity> {
    await this.chatMessageTextRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.chatMessageTextRepository.delete(id);
  }
}
