import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseBodyParamEntity } from '../entity';
import { CreateBaseBodyParamDto, UpdateBaseBodyParamDto } from '../dto';


@Injectable()
export class BaseBodyParamService {
  constructor(
    @InjectRepository(BaseBodyParamEntity)
    private readonly baseBodyParamRepository: Repository<BaseBodyParamEntity>,
  ) {}

  async create(createBaseBodyParamDto: CreateBaseBodyParamDto): Promise<BaseBodyParamEntity> {
    const newParam = this.baseBodyParamRepository.create(createBaseBodyParamDto);
    return this.baseBodyParamRepository.save(newParam);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseBodyParamEntity>> {
    const [items, total] = await this.baseBodyParamRepository.findAndCount({
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseBodyParamEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseBodyParamRepository.findAndCount({
      where: [
        { name: Like(searchTerm) },
        { description: Like(searchTerm) }
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

  async findOne(id: number): Promise<BaseBodyParamEntity | null> {
    return this.baseBodyParamRepository.findOneBy({ id });
  }

  async findByUnitId(unitId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseBodyParamEntity>> {
    const [items, total] = await this.baseBodyParamRepository.findAndCount({
      where: { unitId },
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

  async update(
    id: number,
    updateBaseBodyParamDto: UpdateBaseBodyParamDto,
  ): Promise<BaseBodyParamEntity | null> {
    const result = await this.baseBodyParamRepository.update(id, updateBaseBodyParamDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseBodyParamRepository.delete(id);
    return result.affected > 0;
  }
}
