import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerDto, UpdateGymManagerDto } from '../dto';
import { GymManagerEntity } from '../entity';

@Injectable()
export class GymManagerService {
  constructor(
    @InjectRepository(GymManagerEntity)
    private readonly gymManagerRepository: Repository<GymManagerEntity>,
  ) {}

  async create(createDto: CreateGymManagerDto): Promise<GymManagerEntity> {
    const manager = this.gymManagerRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymManagerRepository.save(manager);
  }

  async findByGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository.createQueryBuilder('manager')
      .where('manager.gymId = :gymId', { gymId })
      .orderBy('manager.createdAt', 'DESC');

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
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository.createQueryBuilder('manager')
      .where('manager.managerUserId = :userId', { userId })
      .orderBy('manager.createdAt', 'DESC');

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

  async findBest(
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository.createQueryBuilder('manager')
      .where('manager.gymId = :gymId', { gymId })
      .orderBy('manager.createdAt', 'DESC');

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

  async findOne(id: number): Promise<GymManagerEntity> {
    return await this.gymManagerRepository.findOne({
      where: { id },
      relations: [
        'user',
        'gym',
        'overview',
        'qualifications',
        'specializedWorkouts'
      ]
    });
  }

  async update(id: number, updateDto: UpdateGymManagerDto, userId: number): Promise<GymManagerEntity> {
    await this.gymManagerRepository.update(
      { id, managerUserId: userId },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.gymManagerRepository.delete({ id, managerUserId: userId });
  }
}
