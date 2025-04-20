import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymMembershipPlanFeaturesDto, UpdateGymMembershipPlanFeaturesDto } from '../dto';
import { GymMembershipPlanFeaturesEntity } from '../entity';

@Injectable()
export class GymMembershipPlanFeaturesService {
  constructor(
    @InjectRepository(GymMembershipPlanFeaturesEntity)
    private readonly gymMembershipPlanFeaturesRepository: Repository<GymMembershipPlanFeaturesEntity>,
  ) {}

  async create(createDto: CreateGymMembershipPlanFeaturesDto, userId: number): Promise<GymMembershipPlanFeaturesEntity> {
    const feature = this.gymMembershipPlanFeaturesRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymMembershipPlanFeaturesRepository.save(feature);
  }

  async findByPlan(
    planId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymMembershipPlanFeaturesEntity>> {
    const queryBuilder = this.gymMembershipPlanFeaturesRepository.createQueryBuilder('feature')
      .where('feature.gymMembershipPlanId = :planId', { planId })
      .orderBy('feature.highlight', 'DESC')
      .addOrderBy('feature.createdAt', 'DESC');

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

  async findOne(id: number): Promise<GymMembershipPlanFeaturesEntity> {
    return await this.gymMembershipPlanFeaturesRepository.findOne({
      where: { id },
      relations: ['membershipPlan']
    });
  }

  async update(id: number, updateDto: UpdateGymMembershipPlanFeaturesDto): Promise<GymMembershipPlanFeaturesEntity> {
    await this.gymMembershipPlanFeaturesRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gymMembershipPlanFeaturesRepository.delete(id);
  }
}
