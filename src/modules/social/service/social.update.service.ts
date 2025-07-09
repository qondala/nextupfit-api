import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  PaginatedResponseDto,
  PaginationOptionsDto,
} from '@app/common/dto';

import {
  CreateSocialUpdateDto,
  UpdateSocialUpdateDto,
  SocialUpdatesFindCriteriaDto,
  SocialUpdatesFindOrderEnum,
} from '../dto';

import { SocialUpdateEntity } from '../entity';

@Injectable()
export class SocialUpdateService {
  constructor(
    @InjectRepository(SocialUpdateEntity)
    private readonly socialUpdateRepository: Repository<SocialUpdateEntity>,
  ) {}

  async create(createDto: CreateSocialUpdateDto): Promise<SocialUpdateEntity> {
    const entity = this.socialUpdateRepository.create(createDto);
    return await this.socialUpdateRepository.save(entity);
  }

  async findAll(
    criteria: SocialUpdatesFindCriteriaDto,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<SocialUpdateEntity>> {
    const queryBuilder = this.socialUpdateRepository.createQueryBuilder('socialUpdate')
      .leftJoinAndSelect('socialUpdate.authorUser', 'authorUser')
      .leftJoinAndSelect('socialUpdate.authorManager', 'authorManager')

    if (criteria.authorUserId) {
      queryBuilder.andWhere('socialUpdate.authorUserId = :authorUserId', { authorUserId: criteria.authorUserId });
    }

    if (criteria.authorManagerId) {
      queryBuilder.andWhere('socialUpdate.authorManagerId = :authorManagerId', { authorManagerId: criteria.authorManagerId });
    }

    if (criteria.socialActorType) {
      queryBuilder.andWhere('socialUpdate.socialActorType = :socialActorType', { socialActorType: criteria.socialActorType });
    }

    if (criteria.socialActorId) {
      queryBuilder.andWhere('socialUpdate.socialActorId = :socialActorId', { socialActorId: criteria.socialActorId });
    }

    if (criteria.socialUpdateType) {
      queryBuilder.andWhere('socialUpdate.socialUpdateType = :socialUpdateType', { socialUpdateType: criteria.socialUpdateType });
    }

    if (criteria.privacy) {
      queryBuilder.andWhere('socialUpdate.privacy = :privacy', { privacy: criteria.privacy });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case SocialUpdatesFindOrderEnum.date:
          queryBuilder.orderBy('socialUpdate.createdAt', 'DESC');
          break;
        case SocialUpdatesFindOrderEnum.random:
          queryBuilder.orderBy('RANDOM()');
          break;
      }
    }

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

  async findOne(id: number): Promise<SocialUpdateEntity> {
    return await this.socialUpdateRepository.findOne({
      where: { id },
      relations: [
        'authorUser',
        'authorManager',
      ]
    });
  }

  async update(
    id: number,
    updateDto: UpdateSocialUpdateDto
  ): Promise<SocialUpdateEntity> {
    await this.socialUpdateRepository.update(
      { id },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.socialUpdateRepository.delete({ id });
    return;
  }

}
