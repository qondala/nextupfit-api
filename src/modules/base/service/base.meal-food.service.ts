import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseMealFoodEntity } from '../entity';
import { CreateBaseMealFoodDto, UpdateBaseMealFoodDto } from '../dto';

@Injectable()
export class BaseMealFoodService {
  constructor(
    @InjectRepository(BaseMealFoodEntity)
    private readonly baseMealFoodRepository: Repository<BaseMealFoodEntity>,
  ) {}

  async create(createBaseMealFoodDto: CreateBaseMealFoodDto): Promise<BaseMealFoodEntity> {
    const newMealFood = this.baseMealFoodRepository.create(createBaseMealFoodDto);
    return this.baseMealFoodRepository.save(newMealFood);
  }

  async findAll(
    options: PaginationOptionsDto,
    mealId?: number
  ): Promise<PaginatedResponseDto<BaseMealFoodEntity>> {
    const queryBuilder = this.baseMealFoodRepository.createQueryBuilder('mealFood');
    
    if (mealId) {
      queryBuilder.where('mealFood.mealId = :mealId', { mealId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('mealFood.id', 'DESC');
    
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

  async findOne(id: number): Promise<BaseMealFoodEntity | null> {
    return this.baseMealFoodRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateBaseMealFoodDto: UpdateBaseMealFoodDto,
  ): Promise<BaseMealFoodEntity | null> {
    const result = await this.baseMealFoodRepository.update(id, updateBaseMealFoodDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseMealFoodRepository.delete(id);
    return result.affected > 0;
  }
} 