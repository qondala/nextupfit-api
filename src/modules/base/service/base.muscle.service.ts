import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseMuscleEntity } from '../entity';
import { CreateBaseMuscleDto, UpdateBaseMuscleDto } from '../dto';

@Injectable()
export class BaseMuscleService {
  constructor(
    @InjectRepository(BaseMuscleEntity)
    private readonly baseMuscleRepository: Repository<BaseMuscleEntity>,
  ) {}

  async create(createBaseMuscleDto: CreateBaseMuscleDto): Promise<BaseMuscleEntity> {
    const newMuscle = this.baseMuscleRepository.create(createBaseMuscleDto);
    return this.baseMuscleRepository.save(newMuscle);
  }

  async findAll(
    options: PaginationOptionsDto,
    createdByUserId?: number
  ): Promise<PaginatedResponseDto<BaseMuscleEntity>> {
    const queryBuilder = this.baseMuscleRepository.createQueryBuilder('muscle');
    
    if (createdByUserId) {
      queryBuilder.where('muscle.createdByUserId = :createdByUserId', { createdByUserId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('muscle.id', 'DESC');
    
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseMuscleEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseMuscleRepository.findAndCount({
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

  async findOne(id: number): Promise<BaseMuscleEntity | null> {
    return this.baseMuscleRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseMuscleEntity | null> {
    return this.baseMuscleRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseMuscleDto: UpdateBaseMuscleDto,
  ): Promise<BaseMuscleEntity | null> {
    const result = await this.baseMuscleRepository.update(id, updateBaseMuscleDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseMuscleRepository.delete(id);
    return result.affected > 0;
  }
} 