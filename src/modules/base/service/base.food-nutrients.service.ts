import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseFoodNutrientsEntity } from '../entity';
import { CreateBaseFoodNutrientsDto, UpdateBaseFoodNutrientsDto } from '../dto';


@Injectable()
export class BaseFoodNutrientsService {
  constructor(
    @InjectRepository(BaseFoodNutrientsEntity)
    private readonly baseFoodNutrientsRepository: Repository<BaseFoodNutrientsEntity>,
  ) {}

  async create(createBaseFoodNutrientsDto: CreateBaseFoodNutrientsDto): Promise<BaseFoodNutrientsEntity> {
    const newFoodNutrient = this.baseFoodNutrientsRepository.create(createBaseFoodNutrientsDto);
    return this.baseFoodNutrientsRepository.save(newFoodNutrient);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    const [items, total] = await this.baseFoodNutrientsRepository.findAndCount({
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseFoodNutrientsRepository.findAndCount({
      where: [
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

  async findByFoodId(foodId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    const [items, total] = await this.baseFoodNutrientsRepository.findAndCount({
      where: { foodId },
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

  async findByNutrientId(nutrientId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    const [items, total] = await this.baseFoodNutrientsRepository.findAndCount({
      where: { nutrientId },
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

  async findByCreatedByUserId(userId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    const [items, total] = await this.baseFoodNutrientsRepository.findAndCount({
      where: { createdByUserId: userId },
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

  async findOne(id: number): Promise<BaseFoodNutrientsEntity | null> {
    return this.baseFoodNutrientsRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseFoodNutrientsEntity | null> {
    return this.baseFoodNutrientsRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseFoodNutrientsDto: UpdateBaseFoodNutrientsDto,
  ): Promise<BaseFoodNutrientsEntity | null> {
    const result = await this.baseFoodNutrientsRepository.update(id, updateBaseFoodNutrientsDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseFoodNutrientsRepository.delete(id);
    return result.affected > 0;
  }
}
