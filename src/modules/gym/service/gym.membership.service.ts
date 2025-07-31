import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymMembershipDto, UpdateGymMembershipDto } from '../dto';
import { GymMembershipEntity } from '../entity';
import { GymMembershipStatusEnum } from '../types';

@Injectable()
export class GymMembershipService {
  constructor(
    @InjectRepository(GymMembershipEntity)
    private readonly gymMembershipRepository: Repository<GymMembershipEntity>,
  ) {}

  async create(createDto: CreateGymMembershipDto): Promise<GymMembershipEntity> {

    // Check if user is already a member of the gym in the plan
    // NB: A user cannot request a membership with the same plan in the same gym
    if (await this.isMemberWithPlanId(createDto.memberUserId,createDto.gymId, createDto.gymMembershipPlanId)) {
      throw new ConflictException(`User ${createDto.memberUserId} is already member of Gym ${createDto.gymId} in the plan ${createDto.gymMembershipPlanId}`);
    }

    const membership = this.gymMembershipRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymMembershipRepository.save(membership);
  }

  async isMemberWithPlanId(
    userId: number,
    gymId: number,
    gymMembershipPlanId: number): Promise<boolean> {
    const openings = await this.gymMembershipRepository.find({
      where: { memberUserId: userId, gymId, gymMembershipPlanId }
    });
    return openings.length > 0;
  }

  async getUserGymMembershipWithPlanId(
    userId: number,
    gymId: number,
    gymMembershipPlanId: number): Promise<GymMembershipEntity> {
    return await this.gymMembershipRepository.findOne({
      where: { memberUserId: userId, gymId, gymMembershipPlanId }
    });
  }

  async updateGymMembershipStatusByPlanId(
    userId: number,
    gymId: number,
    gymMembershipPlanId: number,
    status: GymMembershipStatusEnum): Promise<void> {
    await this.gymMembershipRepository.update(
      { memberUserId: userId, gymId, gymMembershipPlanId },
      { membershipStatus: status, lastStatusUpdate: new Date() }
    );
    return;
  }

  async updateGymMembershipStatusById(id: number, status: GymMembershipStatusEnum): Promise<void> {
    await this.gymMembershipRepository.update(
      { id },
      { membershipStatus: status, lastStatusUpdate: new Date() }
    );
    return;
  }

  async getAllMembershipsOfGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymMembershipEntity>> {
    const queryBuilder = this.gymMembershipRepository.createQueryBuilder('membership')
      .where('membership.gymId = :gymId', { gymId })
      .orderBy('membership.createdAt', 'DESC');

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

  async getAllUserGymMemberships(
    userId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymMembershipEntity>> {
    const queryBuilder = this.gymMembershipRepository.createQueryBuilder('membership')
      .where('membership.memberUserId = :userId', { userId })
      .orderBy('membership.createdAt', 'DESC');

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

  async getAllUserAndGymMemberships(
    userId: number,
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymMembershipEntity>> {
    const queryBuilder = this.gymMembershipRepository.createQueryBuilder('membership')
      .where('membership.memberUserId = :userId', { userId })
      .andWhere('membership.gymId = :gymId', { gymId })
      .orderBy('membership.createdAt', 'DESC');

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

  async getUserGymMemberships(
    userId: number,
    gymId: number
  ): Promise<GymMembershipEntity[]> {
    const queryBuilder = this.gymMembershipRepository.createQueryBuilder('membership')
      .where('membership.memberUserId = :userId', { userId })
      .andWhere('membership.gymId = :gymId', { gymId })
      .orderBy('membership.createdAt', 'DESC');

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<GymMembershipEntity> {
    return await this.gymMembershipRepository.findOne({
      where: { id },
      relations: ['membershipPlan']
    });
  }

  async update(id: number, updateDto: UpdateGymMembershipDto): Promise<GymMembershipEntity> {
    await this.gymMembershipRepository.update(
      { id },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number ): Promise<void> {
    await this.gymMembershipRepository.delete({ id });
  }
}
