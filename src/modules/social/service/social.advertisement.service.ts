import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateSocialAdvertisementDto, UpdateSocialAdvertisementDto } from '../dto';
import { SocialAdvertisementEntity } from '../entity';


@Injectable()
export class SocialAdvertisementService {
  constructor(
    @InjectRepository(SocialAdvertisementEntity)
    private readonly advertisementRepository: Repository<SocialAdvertisementEntity>,
  ) {}

  async create(createDto: CreateSocialAdvertisementDto, userId: number): Promise<SocialAdvertisementEntity> {
    const advertisement = this.advertisementRepository.create({
      ...createDto,
      userId,
      createdAt: new Date()
    });
    return await this.advertisementRepository.save(advertisement);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<SocialAdvertisementEntity>> {
    const queryBuilder = this.advertisementRepository.createQueryBuilder('advertisement')
      .orderBy('advertisement.createdAt', 'DESC');

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

  async findOne(id: number): Promise<SocialAdvertisementEntity> {
    return await this.advertisementRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateDto: UpdateSocialAdvertisementDto): Promise<SocialAdvertisementEntity> {
    await this.advertisementRepository.update(id, {
      ...updateDto,
      updatedAt: new Date()
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.advertisementRepository.delete(id);
  }
}
