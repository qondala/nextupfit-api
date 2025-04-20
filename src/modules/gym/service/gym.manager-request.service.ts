import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerRequestDto, UpdateGymManagerRequestDto } from '../dto';
import { GymManagerRequestEntity } from '../entity';

@Injectable()
export class GymManagerRequestService {
  constructor(
    @InjectRepository(GymManagerRequestEntity)
    private readonly gymManagerRequestRepository: Repository<GymManagerRequestEntity>,
  ) {}

  async create(createDto: CreateGymManagerRequestDto): Promise<GymManagerRequestEntity> {
    const request = this.gymManagerRequestRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymManagerRequestRepository.save(request);
  }

  async findByGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerRequestEntity>> {
    const queryBuilder = this.gymManagerRequestRepository.createQueryBuilder('request')
      .where('request.gymId = :gymId', { gymId })
      .orderBy('request.createdAt', 'DESC');

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

  async findByUser(
    userId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerRequestEntity>> {
    const queryBuilder = this.gymManagerRequestRepository.createQueryBuilder('request')
      .where('request.requestUserId = :userId', { userId })
      .orderBy('request.createdAt', 'DESC');

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

  async findOne(id: number): Promise<GymManagerRequestEntity> {
    return await this.gymManagerRequestRepository.findOne({
      where: { id },
      relations: ['applicant']
    });
  }

  async update(id: number, updateDto: UpdateGymManagerRequestDto): Promise<GymManagerRequestEntity> {
    await this.gymManagerRequestRepository.update(
      { id },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gymManagerRequestRepository.delete({ id });
  }
}
