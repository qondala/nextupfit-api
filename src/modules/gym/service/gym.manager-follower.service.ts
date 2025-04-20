import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymManagerFollowerDto, UpdateGymManagerFollowerDto } from '../dto';
import { GymManagerFollowerEntity } from '../entity';

@Injectable()
export class GymManagerFollowerService {
  constructor(
    @InjectRepository(GymManagerFollowerEntity)
    private readonly gymManagerFollowerRepository: Repository<GymManagerFollowerEntity>,
  ) {}

  async create(createDto: CreateGymManagerFollowerDto, userId: number): Promise<GymManagerFollowerEntity> {
    const follower = this.gymManagerFollowerRepository.create({
      ...createDto,
      followerUserId: createDto.followerUserId || userId,
      acceptedDate: createDto.acceptedDate || new Date(),
      createdAt: new Date()
    });
    return await this.gymManagerFollowerRepository.save(follower);
  }

  async findByManager(
    managerId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymManagerFollowerEntity>> {
    const queryBuilder = this.gymManagerFollowerRepository.createQueryBuilder('follower')
      .where('follower.managerId = :managerId', { managerId })
      .orderBy('follower.createdAt', 'DESC');

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
  ): Promise<PaginatedResponseDto<GymManagerFollowerEntity>> {
    const queryBuilder = this.gymManagerFollowerRepository.createQueryBuilder('follower')
      .where('follower.followerUserId = :userId', { userId })
      .orderBy('follower.createdAt', 'DESC');

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

  async findOne(id: number): Promise<GymManagerFollowerEntity> {
    return await this.gymManagerFollowerRepository.findOne({
      where: { id },
      relations: ['manager', 'follower']
    });
  }

  async update(id: number, updateDto: UpdateGymManagerFollowerDto, userId: number): Promise<GymManagerFollowerEntity> {
    await this.gymManagerFollowerRepository.update(
      { id, followerUserId: userId },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.gymManagerFollowerRepository.delete({ id, followerUserId: userId });
  }
}
