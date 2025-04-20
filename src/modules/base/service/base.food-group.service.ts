import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';


import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseFoodGroupEntity } from '../entity';
import { CreateBaseFoodGroupDto, UpdateBaseFoodGroupDto } from '../dto';


@Injectable()
export class BaseFoodGroupService {
  constructor(
    @InjectRepository(BaseFoodGroupEntity)
    private readonly baseFoodGroupRepository: Repository<BaseFoodGroupEntity>,
  ) {}

  async create(createBaseFoodGroupDto: CreateBaseFoodGroupDto): Promise<BaseFoodGroupEntity> {
    const newFoodGroup = this.baseFoodGroupRepository.create(createBaseFoodGroupDto);
    return this.baseFoodGroupRepository.save(newFoodGroup);
  }

  async findAll(
    options: PaginationOptionsDto,
    createdByUserId?: number
  ): Promise<PaginatedResponseDto<BaseFoodGroupEntity>> {
    const queryBuilder = this.baseFoodGroupRepository.createQueryBuilder('foodGroup');
    
    if (createdByUserId) {
      queryBuilder.where('foodGroup.createdByUserId = :createdByUserId', { createdByUserId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('foodGroup.id', 'DESC');
    
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseFoodGroupEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseFoodGroupRepository.findAndCount({
      where: [
        { name: Like(searchTerm) },
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

  async findOne(id: number): Promise<BaseFoodGroupEntity | null> {
    return this.baseFoodGroupRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseFoodGroupEntity | null> {
    return this.baseFoodGroupRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseFoodGroupDto: UpdateBaseFoodGroupDto,
  ): Promise<BaseFoodGroupEntity | null> {
    const result = await this.baseFoodGroupRepository.update(id, updateBaseFoodGroupDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseFoodGroupRepository.delete(id);
    return result.affected > 0;
  }
}
