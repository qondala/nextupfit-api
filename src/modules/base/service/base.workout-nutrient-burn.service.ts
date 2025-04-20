import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseWorkoutNutrientBurnEntity } from '../entity';
import { CreateBaseWorkoutNutrientBurnDto, UpdateBaseWorkoutNutrientBurnDto } from '../dto';


@Injectable()
export class BaseWorkoutNutrientBurnService {
  constructor(
    @InjectRepository(BaseWorkoutNutrientBurnEntity)
    private readonly baseWorkoutNutrientBurnRepository: Repository<BaseWorkoutNutrientBurnEntity>,
  ) {}

  async create(createBaseWorkoutNutrientBurnDto: CreateBaseWorkoutNutrientBurnDto): Promise<BaseWorkoutNutrientBurnEntity> {
    const newNutrientBurn = this.baseWorkoutNutrientBurnRepository.create(createBaseWorkoutNutrientBurnDto);
    return this.baseWorkoutNutrientBurnRepository.save(newNutrientBurn);
  }

  async findAll(
    options: PaginationOptionsDto,
    workoutId?: number
  ): Promise<PaginatedResponseDto<BaseWorkoutNutrientBurnEntity>> {
    const queryBuilder = this.baseWorkoutNutrientBurnRepository.createQueryBuilder('nutrientBurn');
    
    if (workoutId) {
      queryBuilder.where('nutrientBurn.workoutId = :workoutId', { workoutId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('nutrientBurn.id', 'DESC');
    
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

  async findOne(id: number): Promise<BaseWorkoutNutrientBurnEntity | null> {
    return this.baseWorkoutNutrientBurnRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateBaseWorkoutNutrientBurnDto: UpdateBaseWorkoutNutrientBurnDto,
  ): Promise<BaseWorkoutNutrientBurnEntity | null> {
    const result = await this.baseWorkoutNutrientBurnRepository.update(id, updateBaseWorkoutNutrientBurnDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseWorkoutNutrientBurnRepository.delete(id);
    return result.affected > 0;
  }
} 