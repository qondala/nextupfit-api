import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseNutrientEntity } from '../entity';
import { CreateBaseNutrientDto, UpdateBaseNutrientDto } from '../dto';


@Injectable()
export class BaseNutrientService {
  constructor(
    @InjectRepository(BaseNutrientEntity)
    private readonly baseNutrientRepository: Repository<BaseNutrientEntity>,
  ) {}

  async create(createBaseNutrientDto: CreateBaseNutrientDto): Promise<BaseNutrientEntity> {
    const newNutrient = this.baseNutrientRepository.create(createBaseNutrientDto);
    return this.baseNutrientRepository.save(newNutrient);
  }

  async findAll(
    options: PaginationOptionsDto,
    createdByUserId?: number
  ): Promise<PaginatedResponseDto<BaseNutrientEntity>> {
    const queryBuilder = this.baseNutrientRepository.createQueryBuilder('nutrient');
    
    if (createdByUserId) {
      queryBuilder.where('nutrient.createdByUserId = :createdByUserId', { createdByUserId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('nutrient.id', 'DESC');
    
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseNutrientEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseNutrientRepository.findAndCount({
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

  async findOne(id: number): Promise<BaseNutrientEntity | null> {
    return this.baseNutrientRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseNutrientEntity | null> {
    return this.baseNutrientRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseNutrientDto: UpdateBaseNutrientDto,
  ): Promise<BaseNutrientEntity | null> {
    const result = await this.baseNutrientRepository.update(id, updateBaseNutrientDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseNutrientRepository.delete(id);
    return result.affected > 0;
  }
} 