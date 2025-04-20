import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseWorkoutRecommendedRepetitionEntity } from '../entity';
import { CreateBaseWorkoutRecommendedRepetitionDto, UpdateBaseWorkoutRecommendedRepetitionDto } from '../dto';


@Injectable()
export class BaseWorkoutRecommendedRepetitionService {
  constructor(
    @InjectRepository(BaseWorkoutRecommendedRepetitionEntity)
    private readonly baseWorkoutRecommendedRepetitionRepository: Repository<BaseWorkoutRecommendedRepetitionEntity>,
  ) {}

  async create(createBaseWorkoutRecommendedRepetitionDto: CreateBaseWorkoutRecommendedRepetitionDto): Promise<BaseWorkoutRecommendedRepetitionEntity> {
    const newRepetition = this.baseWorkoutRecommendedRepetitionRepository.create(createBaseWorkoutRecommendedRepetitionDto);
    return this.baseWorkoutRecommendedRepetitionRepository.save(newRepetition);
  }

  async findAll(
    options: PaginationOptionsDto,
    workoutId?: number
  ): Promise<PaginatedResponseDto<BaseWorkoutRecommendedRepetitionEntity>> {
    const queryBuilder = this.baseWorkoutRecommendedRepetitionRepository.createQueryBuilder('repetition');
    
    if (workoutId) {
      queryBuilder.where('repetition.workoutId = :workoutId', { workoutId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('repetition.id', 'DESC');
    
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

  async findOne(id: number): Promise<BaseWorkoutRecommendedRepetitionEntity | null> {
    return this.baseWorkoutRecommendedRepetitionRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateBaseWorkoutRecommendedRepetitionDto: UpdateBaseWorkoutRecommendedRepetitionDto,
  ): Promise<BaseWorkoutRecommendedRepetitionEntity | null> {
    const result = await this.baseWorkoutRecommendedRepetitionRepository.update(id, updateBaseWorkoutRecommendedRepetitionDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseWorkoutRecommendedRepetitionRepository.delete(id);
    return result.affected > 0;
  }
} 