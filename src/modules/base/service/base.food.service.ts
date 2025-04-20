import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseFoodEntity } from '../entity';
import { CreateBaseFoodDto, UpdateBaseFoodDto } from '../dto';

@Injectable()
export class BaseFoodService {
  constructor(
    @InjectRepository(BaseFoodEntity)
    private readonly baseFoodRepository: Repository<BaseFoodEntity>,
  ) {}

  async create(createBaseFoodDto: CreateBaseFoodDto): Promise<BaseFoodEntity> {
    const newFood = this.baseFoodRepository.create(createBaseFoodDto);
    return this.baseFoodRepository.save(newFood);
  }

  async findAll(
    options: PaginationOptionsDto,
    createdByUserId?: number,
    foodGroupId?: number
  ): Promise<PaginatedResponseDto<BaseFoodEntity>> {
    const queryBuilder = this.baseFoodRepository.createQueryBuilder('food');
    
    if (createdByUserId) {
      queryBuilder.where('food.createdByUserId = :createdByUserId', { createdByUserId });
    }

    if (foodGroupId) {
      queryBuilder.andWhere('food.foodGroupId = :foodGroupId', { foodGroupId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('food.id', 'DESC');
    
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseFoodRepository.findAndCount({
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

  async findOne(id: number): Promise<BaseFoodEntity | null> {
    return this.baseFoodRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseFoodEntity | null> {
    return this.baseFoodRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseFoodDto: UpdateBaseFoodDto,
  ): Promise<BaseFoodEntity | null> {
    const result = await this.baseFoodRepository.update(id, updateBaseFoodDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseFoodRepository.delete(id);
    return result.affected > 0;
  }
}
