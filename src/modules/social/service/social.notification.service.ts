import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialNotificationDto, UpdateSocialNotificationDto } from '../dto';
import { SocialNotificationEntity } from '../entity';


@Injectable()
export class SocialNotificationService {
  constructor(
    @InjectRepository(SocialNotificationEntity)
    private readonly notificationRepository: Repository<SocialNotificationEntity>,
  ) {}

  async create(createDto: CreateSocialNotificationDto): Promise<SocialNotificationEntity> {
    const notification = this.notificationRepository.create({
      ...createDto,
      createdAt: new Date(),
      isRead: false
    });
    return await this.notificationRepository.save(notification);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId: number
  ): Promise<PaginatedResponseDto<SocialNotificationEntity>> {
    const queryBuilder = this.notificationRepository.createQueryBuilder('notification')
      .where('notification.userId = :userId', { userId })
      .orderBy('notification.createdAt', 'DESC');

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

  async findOne(id: number): Promise<SocialNotificationEntity> {
    return await this.notificationRepository.findOne({ where: { id } }) as SocialNotificationEntity;
  }

  async update(id: number, updateDto: UpdateSocialNotificationDto): Promise<SocialNotificationEntity> {
    await this.notificationRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async markAsRead(id: number): Promise<SocialNotificationEntity> {
    await this.notificationRepository.update(id, {
      isRead: true,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
