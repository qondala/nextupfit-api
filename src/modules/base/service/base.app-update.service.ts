import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseAppUpdateEntity } from '../entity';
import { CreateBaseAppUpdateDto, UpdateBaseAppUpdateDto } from '../dto';

@Injectable()
export class BaseAppUpdateService {
  constructor(
    @InjectRepository(BaseAppUpdateEntity)
    private readonly baseAppUpdateRepository: Repository<BaseAppUpdateEntity>,
  ) {}

  async create(createBaseAppUpdateDto: CreateBaseAppUpdateDto): Promise<BaseAppUpdateEntity> {
    const newUpdate = this.baseAppUpdateRepository.create(createBaseAppUpdateDto);
    return this.baseAppUpdateRepository.save(newUpdate);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseAppUpdateEntity>> {
    const [items, total] = await this.baseAppUpdateRepository.findAndCount({
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseAppUpdateEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseAppUpdateRepository.findAndCount({
      where: [
        { version: Like(searchTerm) },
        { name: Like(searchTerm) },
        { features: Like(searchTerm) }
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

  async findOne(id: number): Promise<BaseAppUpdateEntity | null> {
    return this.baseAppUpdateRepository.findOneBy({ id });
  }

  async findByVersion(version: string): Promise<BaseAppUpdateEntity | null> {
    return this.baseAppUpdateRepository.findOneBy({ version });
  }

  async update(
    id: number,
    updateBaseAppUpdateDto: UpdateBaseAppUpdateDto,
  ): Promise<BaseAppUpdateEntity | null> {
    const result = await this.baseAppUpdateRepository.update(id, updateBaseAppUpdateDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseAppUpdateRepository.delete(id);
    return result.affected > 0;
  }
}
