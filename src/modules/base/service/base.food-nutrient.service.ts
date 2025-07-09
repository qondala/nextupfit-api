import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseFoodNutrientEntity } from '../entity';
import { CreateBaseFoodNutrientDto, UpdateBaseFoodNutrientDto } from '../dto';


@Injectable()
export class BaseFoodNutrientService {
  constructor(
    @InjectRepository(BaseFoodNutrientEntity)
    private readonly baseFoodNutrientRepository: Repository<BaseFoodNutrientEntity>,
  ) {}

  async create(createBaseFoodNutrientDto: CreateBaseFoodNutrientDto): Promise<BaseFoodNutrientEntity> {
    const newFoodNutrient = this.baseFoodNutrientRepository.create(createBaseFoodNutrientDto);
    return this.baseFoodNutrientRepository.save(newFoodNutrient);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientEntity>> {
    const [items, total] = await this.baseFoodNutrientRepository.findAndCount({
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseFoodNutrientRepository.findAndCount({
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

  async findByFoodId(foodId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientEntity>> {
    const [items, total] = await this.baseFoodNutrientRepository.findAndCount({
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

  async findByNutrientId(nutrientId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientEntity>> {
    const [items, total] = await this.baseFoodNutrientRepository.findAndCount({
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

  async findByCreatedByUserId(userId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodNutrientEntity>> {
    const [items, total] = await this.baseFoodNutrientRepository.findAndCount({
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

  async findOne(id: number): Promise<BaseFoodNutrientEntity | null> {
    return this.baseFoodNutrientRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseFoodNutrientEntity | null> {
    return this.baseFoodNutrientRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseFoodNutrientDto: UpdateBaseFoodNutrientDto,
  ): Promise<BaseFoodNutrientEntity | null> {
    const result = await this.baseFoodNutrientRepository.update(id, updateBaseFoodNutrientDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseFoodNutrientRepository.delete(id);
    return result.affected > 0;
  }
}
