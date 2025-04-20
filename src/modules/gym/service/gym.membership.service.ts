import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymMembershipDto, UpdateGymMembershipDto } from '../dto';
import { GymMembershipEntity } from '../entity';

@Injectable()
export class GymMembershipService {
  constructor(
    @InjectRepository(GymMembershipEntity)
    private readonly gymMembershipRepository: Repository<GymMembershipEntity>,
  ) {}

  async create(createDto: CreateGymMembershipDto): Promise<GymMembershipEntity> {

    if (await this.isMember(createDto.gymId, createDto.memberUserId)) {
      throw new ConflictException(`User ${createDto.memberUserId} is already member of Gym ${createDto.gymId}`);
    }

    const membership = this.gymMembershipRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymMembershipRepository.save(membership);
  }

  async isMember(gymId: number, userId: number): Promise<boolean> {
    const openings = await this.gymMembershipRepository.find({
      where: { gymId, memberUserId: userId }
    });
    return openings.length > 0;
  }

  async findByGym(
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

  async findByUser(
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

  async findOne(id: number): Promise<GymMembershipEntity> {
    return await this.gymMembershipRepository.findOne({
      where: { id },
      relations: ['membershipPlan']
    });
  }

  async update(id: number, updateDto: UpdateGymMembershipDto, userId: number): Promise<GymMembershipEntity> {
    await this.gymMembershipRepository.update(
      { id, memberUserId: userId },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number ): Promise<void> {
    await this.gymMembershipRepository.delete({ id });
  }
}
