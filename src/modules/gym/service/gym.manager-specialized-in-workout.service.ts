import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerSpecializedInWorkoutDto, UpdateGymManagerSpecializedInWorkoutDto } from '../dto';
import { GymManagerSpecializedInWorkoutEntity } from '../entity';

@Injectable()
export class GymManagerSpecializedInWorkoutService {
  constructor(
    @InjectRepository(GymManagerSpecializedInWorkoutEntity)
    private readonly gymManagerSpecializedInWorkoutRepository: Repository<GymManagerSpecializedInWorkoutEntity>,
  ) {}

  async create(createDto: CreateGymManagerSpecializedInWorkoutDto, userId: number): Promise<GymManagerSpecializedInWorkoutEntity> {
    const specializedWorkout = this.gymManagerSpecializedInWorkoutRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymManagerSpecializedInWorkoutRepository.save(specializedWorkout);
  }

  async findByManager(
    managerId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerSpecializedInWorkoutEntity>> {
    const queryBuilder = this.gymManagerSpecializedInWorkoutRepository.createQueryBuilder('specializedWorkout')
      .where('specializedWorkout.managerId = :managerId', { managerId })
      .orderBy('specializedWorkout.createdAt', 'DESC');

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

  async findOne(id: number): Promise<GymManagerSpecializedInWorkoutEntity> {
    return await this.gymManagerSpecializedInWorkoutRepository.findOne({
      where: { id },
      relations: ['baseWorkout']
    });
  }

  async update(id: number, updateDto: UpdateGymManagerSpecializedInWorkoutDto, userId: number): Promise<GymManagerSpecializedInWorkoutEntity> {
    await this.gymManagerSpecializedInWorkoutRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.gymManagerSpecializedInWorkoutRepository.delete(id);
  }
}
