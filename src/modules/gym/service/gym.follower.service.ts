import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreateGymFollowerDto, UpdateGymFollowerDto } from '../dto';
import { GymFollowerEntity } from '../entity';

@Injectable()
export class GymFollowerService {
  constructor(
    @InjectRepository(GymFollowerEntity)
    private readonly gymFollowerRepository: Repository<GymFollowerEntity>,
  ) {}

  async create(createDto: CreateGymFollowerDto): Promise<GymFollowerEntity> {

    if (await this.isFollowing(createDto.gymId, createDto.followerUserId)) {
      throw new ConflictException(`User ${createDto.followerUserId} is already a follower of Gym ${createDto.gymId}`);
    }

    const follower = this.gymFollowerRepository.create({
      ...createDto,
      createdAt: new Date()
    });
    return await this.gymFollowerRepository.save(follower);
  }

  async isFollowing(gymId: number, userId: number): Promise<boolean> {
    const openings = await this.gymFollowerRepository.find({
      where: { gymId, followerUserId: userId }
    });
    return openings.length > 0;
  }

  async findByGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<GymFollowerEntity>> {
    const queryBuilder = this.gymFollowerRepository.createQueryBuilder('follower')
      .where('follower.gymId = :gymId', { gymId })
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
  ): Promise<PaginatedResponseDto<GymFollowerEntity>> {
    const queryBuilder = this.gymFollowerRepository.createQueryBuilder('follower')
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

  async findOne(id: number): Promise<GymFollowerEntity> {
    return await this.gymFollowerRepository.findOne({
      where: { id },
      relations: ['gym', 'follower']
    });
  }

  async update(id: number, updateDto: UpdateGymFollowerDto): Promise<GymFollowerEntity> {
    await this.gymFollowerRepository.update(
      { id },
      updateDto
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gymFollowerRepository.delete({ id });
  }
}
