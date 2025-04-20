import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialAffiliateLinkDto, UpdateSocialAffiliateLinkDto } from '../dto';
import { SocialAffiliateLinkEntity } from '../entity';


@Injectable()
export class SocialAffiliateLinkService {
  constructor(
    @InjectRepository(SocialAffiliateLinkEntity)
    private readonly affiliateLinkRepository: Repository<SocialAffiliateLinkEntity>,
  ) {}

  async create(createDto: CreateSocialAffiliateLinkDto, userId: number): Promise<SocialAffiliateLinkEntity> {
    const affiliateLink = this.affiliateLinkRepository.create({
      ...createDto,
      userId,
      createdAt: new Date()
    });
    return await this.affiliateLinkRepository.save(affiliateLink);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId: number
  ): Promise<PaginatedResponseDto<SocialAffiliateLinkEntity>> {
    const queryBuilder = this.affiliateLinkRepository.createQueryBuilder('affiliateLink')
      .where('affiliateLink.userId = :userId', { userId })
      .orderBy('affiliateLink.createdAt', 'DESC');

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

  async findOne(id: number): Promise<SocialAffiliateLinkEntity> {
    return await this.affiliateLinkRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateDto: UpdateSocialAffiliateLinkDto): Promise<SocialAffiliateLinkEntity> {
    await this.affiliateLinkRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.affiliateLinkRepository.delete(id);
  }
}
