import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { BaseWorkoutHowtoPerformStepEntity } from '../entity';
import { CreateBaseWorkoutHowtoPerformStepDto, UpdateBaseWorkoutHowtoPerformStepDto } from '../dto';


@Injectable()
export class BaseWorkoutHowtoPerformStepService {
  constructor(
    @InjectRepository(BaseWorkoutHowtoPerformStepEntity)
    private readonly baseWorkoutHowtoPerformStepRepository: Repository<BaseWorkoutHowtoPerformStepEntity>,
  ) {}

  async create(createBaseWorkoutHowtoPerformStepDto: CreateBaseWorkoutHowtoPerformStepDto): Promise<BaseWorkoutHowtoPerformStepEntity> {
    const newStep = this.baseWorkoutHowtoPerformStepRepository.create(createBaseWorkoutHowtoPerformStepDto);
    return this.baseWorkoutHowtoPerformStepRepository.save(newStep);
  }

  async findAll(
    options: PaginationOptionsDto,
    workoutId?: number
  ): Promise<PaginatedResponseDto<BaseWorkoutHowtoPerformStepEntity>> {
    const queryBuilder = this.baseWorkoutHowtoPerformStepRepository.createQueryBuilder('step');
    
    if (workoutId) {
      queryBuilder.where('step.workoutId = :workoutId', { workoutId });
    }
    
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy('step.id', 'DESC');
    
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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseWorkoutHowtoPerformStepEntity>> {
    const searchTerm = `%${query}%`;
    
    const [items, total] = await this.baseWorkoutHowtoPerformStepRepository.findAndCount({
      where: [
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

  async findOne(id: number): Promise<BaseWorkoutHowtoPerformStepEntity | null> {
    return this.baseWorkoutHowtoPerformStepRepository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<BaseWorkoutHowtoPerformStepEntity | null> {
    return this.baseWorkoutHowtoPerformStepRepository.findOneBy({ code });
  }

  async update(
    id: number,
    updateBaseWorkoutHowtoPerformStepDto: UpdateBaseWorkoutHowtoPerformStepDto,
  ): Promise<BaseWorkoutHowtoPerformStepEntity | null> {
    const result = await this.baseWorkoutHowtoPerformStepRepository.update(id, updateBaseWorkoutHowtoPerformStepDto);
    
    if (result.affected === 0) {
      return null;
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseWorkoutHowtoPerformStepRepository.delete(id);
    return result.affected > 0;
  }
} 