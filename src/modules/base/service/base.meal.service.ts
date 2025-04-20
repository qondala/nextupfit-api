import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseMealEntity } from '../entity';
import { CreateBaseMealDto, UpdateBaseMealDto } from '../dto';

@Injectable()
export class BaseMealService {
  constructor(
    @InjectRepository(BaseMealEntity)
    private readonly baseMealRepository: Repository<BaseMealEntity>,
  ) {}

  async create(createBaseMealDto: CreateBaseMealDto): Promise<BaseMealEntity> {
    const newMeal = this.baseMealRepository.create(createBaseMealDto);
    return this.baseMealRepository.save(newMeal);
  }

  async findAll(
    options: PaginationOptionsDto,
    createdByUserId?: number
  ): Promise<PaginatedResponseDto<BaseMealEntity>> {
    const queryBuilder = this.baseMealRepository.createQueryBuilder('meal');
    
    if (createdByUserId) {
      queryBuilder.where('meal.createdByUserId = :createdByUserId', { createdByUserId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('meal.id', 'DESC');
    
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseMealEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseMealRepository.findAndCount({
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

  async findOne(id: number): Promise<BaseMealEntity | null> {
    return this.baseMealRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseMealEntity | null> {
    return this.baseMealRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseMealDto: UpdateBaseMealDto,
  ): Promise<BaseMealEntity | null> {
    const result = await this.baseMealRepository.update(id, updateBaseMealDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseMealRepository.delete(id);
    return result.affected > 0;
  }
} 