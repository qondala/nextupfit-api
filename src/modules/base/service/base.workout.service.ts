import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseWorkoutEntity } from '../entity';
import { CreateBaseWorkoutDto, UpdateBaseWorkoutDto } from '../dto';


@Injectable()
export class BaseWorkoutService {

  constructor(
    @InjectRepository(BaseWorkoutEntity)
    private readonly baseWorkoutRepository: Repository<BaseWorkoutEntity>,
  ) {}

  async create(createBaseWorkoutDto: CreateBaseWorkoutDto): Promise<BaseWorkoutEntity> {
    const newWorkout = this.baseWorkoutRepository.create(createBaseWorkoutDto);
    return this.baseWorkoutRepository.save(newWorkout);
  }

  async findAll(
    options: PaginationOptionsDto,
    createdByUserId?: number
  ): Promise<PaginatedResponseDto<BaseWorkoutEntity>> {
    const queryBuilder = this.baseWorkoutRepository.createQueryBuilder('workout');

    const defaultWorkout = 'workout.createdByUserId IS NULL OR workout.createdByUserId = 0';
    if (createdByUserId) {
      queryBuilder.where(`${defaultWorkout} OR workout.createdByUserId = :createdByUserId`, { createdByUserId });
    }

    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('workout.id', 'DESC');
    
    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page
      }
    };
  }

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseWorkoutEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseWorkoutRepository.findAndCount({
      where: [
        { name: Like(searchTerm) },
        { description: Like(searchTerm) },
        { code: Like(searchTerm) }
      ],
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { id: 'DESC' }
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page
      }
    };
  }

  async findOne(id: number): Promise<BaseWorkoutEntity | null> {
    return this.baseWorkoutRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseWorkoutEntity | null> {
    return this.baseWorkoutRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseWorkoutDto: UpdateBaseWorkoutDto,
  ): Promise<BaseWorkoutEntity | null> {
    const result = await this.baseWorkoutRepository.update(id, updateBaseWorkoutDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseWorkoutRepository.delete(id);
    return result.affected > 0;
  }
} 