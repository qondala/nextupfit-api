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
    private readonly repository: Repository<GymManagerSpecializedInWorkoutEntity>,
  ) {}

  async create(createDto: CreateGymManagerSpecializedInWorkoutDto): Promise<GymManagerSpecializedInWorkoutEntity> {
    const specializedWorkout = this.repository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.repository.save(specializedWorkout);
  }

  async findByManager(
    managerId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerSpecializedInWorkoutEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('specializedWorkout')
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

  async findManagersSpecializedInWorkouts(
    workoutIds: number[],
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerSpecializedInWorkoutEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('specializedWorkout')
      .where('specializedWorkout.workoutId IN (:...workoutIds)', { workoutIds })
      .orderBy('RANDOM()');

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
    return await this.repository.findOne({
      where: { id },
      relations: ['baseWorkout']
    });
  }

  async update(id: number, updateDto: UpdateGymManagerSpecializedInWorkoutDto): Promise<GymManagerSpecializedInWorkoutEntity> {
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
