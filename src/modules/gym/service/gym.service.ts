import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymDto, UpdateGymDto } from '../dto';
import { GymEntity } from '../entity';

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(GymEntity)
    private readonly gymRepository: Repository<GymEntity>,
  ) {}

  async create(createDto: CreateGymDto): Promise<GymEntity> {
    const gym = this.gymRepository.create(createDto);
    return await this.gymRepository.save(gym);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository.createQueryBuilder('gym')
      .orderBy('gym.createdAt', 'DESC');

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page
      }
    };
  }

  async findOne(id: number): Promise<GymEntity> {
    return await this.gymRepository.findOne({ 
      where: { id },
      relations: [
        'owner',
        'managers',
        'membershipPlans',
        'specializedWorkouts'
      ]
    });
  }

  async update(id: number, updateDto: UpdateGymDto): Promise<GymEntity> {
    await this.gymRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gymRepository.delete(id);
  }
}
