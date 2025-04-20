import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymMembershipPlanDto, UpdateGymMembershipPlanDto } from '../dto';
import { GymMembershipPlanEntity } from '../entity';

@Injectable()
export class GymMembershipPlanService {
  constructor(
    @InjectRepository(GymMembershipPlanEntity)
    private readonly gymMembershipPlanRepository: Repository<GymMembershipPlanEntity>,
  ) {}

  async create(createDto: CreateGymMembershipPlanDto, userId: number): Promise<GymMembershipPlanEntity> {
    const plan = this.gymMembershipPlanRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymMembershipPlanRepository.save(plan);
  }

  async findByGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymMembershipPlanEntity>> {
    const queryBuilder = this.gymMembershipPlanRepository.createQueryBuilder('plan')
      .where('plan.gymId = :gymId', { gymId })
      .orderBy('plan.createdAt', 'DESC');

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

  async findOne(id: number): Promise<GymMembershipPlanEntity> {
    return await this.gymMembershipPlanRepository.findOne({
      where: { id },
      relations: ['features']
    });
  }

  async update(id: number, updateDto: UpdateGymMembershipPlanDto, userId: number): Promise<GymMembershipPlanEntity> {
    await this.gymMembershipPlanRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.gymMembershipPlanRepository.delete(id);
  }
}
