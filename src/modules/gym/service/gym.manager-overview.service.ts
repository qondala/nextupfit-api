import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerOverviewDto, UpdateGymManagerOverviewDto } from '../dto';
import { GymManagerOverviewEntity } from '../entity';

@Injectable()
export class GymManagerOverviewService {
  constructor(
    @InjectRepository(GymManagerOverviewEntity)
    private readonly gymManagerOverviewRepository: Repository<GymManagerOverviewEntity>,
  ) {}

  async create(createDto: CreateGymManagerOverviewDto, userId: number): Promise<GymManagerOverviewEntity> {
    const overview = this.gymManagerOverviewRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymManagerOverviewRepository.save(overview);
  }

  async findByManager(
    managerId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerOverviewEntity>> {
    const queryBuilder = this.gymManagerOverviewRepository.createQueryBuilder('overview')
      .where('overview.managerUserId = :managerId', { managerId })
      .orderBy('overview.createdAt', 'DESC');

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

  async findBestRatedAndAttented(
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerOverviewEntity>> {
    const queryBuilder = this.gymManagerOverviewRepository.createQueryBuilder('overview')
      .orderBy('overview.ratingsAvg', 'DESC')
      .orderBy('overview.attendeesCount', 'DESC');

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
    

  async findOne(id: number): Promise<GymManagerOverviewEntity> {
    return await this.gymManagerOverviewRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateDto: UpdateGymManagerOverviewDto, userId: number): Promise<GymManagerOverviewEntity> {
    await this.gymManagerOverviewRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.gymManagerOverviewRepository.delete(id);
  }
}
