import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymSpecializedInWorkoutDto, UpdateGymSpecializedInWorkoutDto } from '../dto';
import { GymSpecializedInWorkoutEntity } from '../entity';

@Injectable()
export class GymSpecializedInWorkoutService {
  constructor(
    @InjectRepository(GymSpecializedInWorkoutEntity)
    private readonly gymSpecializedInWorkoutRepository: Repository<GymSpecializedInWorkoutEntity>,
  ) {}

  async create(createDto: CreateGymSpecializedInWorkoutDto): Promise<GymSpecializedInWorkoutEntity> {
    const specializedWorkout = this.gymSpecializedInWorkoutRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymSpecializedInWorkoutRepository.save(specializedWorkout);
  }

  async findByGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymSpecializedInWorkoutEntity>> {
    const queryBuilder = this.gymSpecializedInWorkoutRepository.createQueryBuilder('workout')
      .where('workout.gymId = :gymId', { gymId })
      .orderBy('workout.createdAt', 'DESC');

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

  async findOne(id: number): Promise<GymSpecializedInWorkoutEntity> {
    return await this.gymSpecializedInWorkoutRepository.findOne({
      where: { id },
      relations: ['workout']
    });
  }

  async update(id: number, updateDto: UpdateGymSpecializedInWorkoutDto): Promise<GymSpecializedInWorkoutEntity> {
    await this.gymSpecializedInWorkoutRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gymSpecializedInWorkoutRepository.delete(id);
  }
}
