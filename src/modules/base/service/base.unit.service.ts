import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseUnitEntity } from '../entity';
import { CreateBaseUnitDto, UpdateBaseUnitDto } from '../dto';

@Injectable()
export class BaseUnitService {
  constructor(
    @InjectRepository(BaseUnitEntity)
    private readonly baseUnitRepository: Repository<BaseUnitEntity>,
  ) {}

  async create(createBaseUnitDto: CreateBaseUnitDto): Promise<BaseUnitEntity> {
    const newUnit = this.baseUnitRepository.create(createBaseUnitDto);
    return this.baseUnitRepository.save(newUnit);
  }

  async findAll(
    options: PaginationOptionsDto,
    createdByUserId?: number
  ): Promise<PaginatedResponseDto<BaseUnitEntity>> {
    const queryBuilder = this.baseUnitRepository.createQueryBuilder('unit');
    
    if (createdByUserId) {
      queryBuilder.where('unit.createdByUserId = :createdByUserId', { createdByUserId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('unit.id', 'DESC');
    
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseUnitEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseUnitRepository.findAndCount({
      where: [
        { name: Like(searchTerm) },
        { abbreviation: Like(searchTerm) },
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

  async findOne(id: number): Promise<BaseUnitEntity | null> {
    return this.baseUnitRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseUnitEntity | null> {
    return this.baseUnitRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseUnitDto: UpdateBaseUnitDto,
  ): Promise<BaseUnitEntity | null> {
    const result = await this.baseUnitRepository.update(id, updateBaseUnitDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseUnitRepository.delete(id);
    return result.affected > 0;
  }
} 