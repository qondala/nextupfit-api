import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialAffiliateProgramDto, UpdateSocialAffiliateProgramDto } from '../dto';
import { SocialAffiliateProgramEntity } from '../entity';


@Injectable()
export class SocialAffiliateProgramService {
  constructor(
    @InjectRepository(SocialAffiliateProgramEntity)
    private readonly affiliateProgramRepository: Repository<SocialAffiliateProgramEntity>,
  ) {}

  async create(createDto: CreateSocialAffiliateProgramDto, userId: number): Promise<SocialAffiliateProgramEntity> {
    const affiliateProgram = this.affiliateProgramRepository.create({
      ...createDto,
      userId,
      createdAt: new Date()
    });
    return await this.affiliateProgramRepository.save(affiliateProgram);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
    userId?: number
  ): Promise<PaginatedResponseDto<SocialAffiliateProgramEntity>> {
    const queryBuilder = this.affiliateProgramRepository.createQueryBuilder('affiliateProgram')
      .orderBy('affiliateProgram.createdAt', 'DESC');

    if (userId) {
      queryBuilder.where('affiliateProgram.userId = :userId', { userId });
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

  async findOne(id: number): Promise<SocialAffiliateProgramEntity> {
    return await this.affiliateProgramRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateDto: UpdateSocialAffiliateProgramDto): Promise<SocialAffiliateProgramEntity> {
    await this.affiliateProgramRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.affiliateProgramRepository.delete(id);
  }
}
