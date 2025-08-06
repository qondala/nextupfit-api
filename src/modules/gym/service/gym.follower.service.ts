import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { CreateGymFollowerDto, UpdateGymFollowerDto } from "../dto";
import { GymFollowerEntity } from "../entity";

@Injectable()
export class GymFollowerService {
  constructor(
    @InjectRepository(GymFollowerEntity)
    private readonly gymFollowerRepository: Repository<GymFollowerEntity>,
  ) {}

  async create(createDto: CreateGymFollowerDto): Promise<GymFollowerEntity> {
    if (await this.isFollowing(createDto.followerUserId, createDto.gymId)) {
      throw new ConflictException(
        `User ${createDto.followerUserId} is already a follower of Gym ${createDto.gymId}`,
      );
    }

    const follower = this.gymFollowerRepository.create(createDto);
    return await this.gymFollowerRepository.save(follower);
  }

  async isFollowing(userId: number, gymId: number): Promise<GymFollowerEntity> {
    const follower = await this.gymFollowerRepository.findOne({
      where: { gymId, followerUserId: userId },
    });
    return follower;
  }

  async findAllFollowersOfGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymFollowerEntity>> {
    const queryBuilder = this.gymFollowerRepository
      .createQueryBuilder("gfollower")
      .where("gfollower.gymId = :gymId", { gymId })
      .orderBy("gfollower.acceptedDate", "ASC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async findAllGymsFollowedByUser(
    userId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymFollowerEntity>> {
    const queryBuilder = this.gymFollowerRepository
      .createQueryBuilder("gfollower")
      .where("gfollower.followerUserId = :userId", { userId })
      .orderBy("gfollower.acceptedDate", "ASC");

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
        currentPage: paginationOptions.page,
      },
    };
  }

  async findOne(id: number): Promise<GymFollowerEntity> {
    return await this.gymFollowerRepository.findOne({
      where: { id },
      relations: ["gym", "follower"],
    });
  }

  async acceptFollower(userId: number, gymId: number): Promise<void> {
    await this.gymFollowerRepository.update(
      { gymId, followerUserId: userId },
      { accepted: true, acceptedDate: new Date() },
    );
  }

  async stopFollowing(userId: number, gymId: number): Promise<void> {
    await this.gymFollowerRepository.update(
      { gymId, followerUserId: userId },
      { stopped: true, stoppedDate: new Date() },
    );
  }

  async rejectFollower(userId: number, gymId: number): Promise<void> {
    await this.gymFollowerRepository.update(
      { gymId, followerUserId: userId },
      { rejected: true, rejectedDate: new Date() },
    );
  }

  async blockFollower(gymId: number, userId: number): Promise<void> {
    await this.gymFollowerRepository.update(
      { gymId, followerUserId: userId },
      { blocked: true, blockedDate: new Date() },
    );
  }

  async unblockFollower(gymId: number, userId: number): Promise<void> {
    await this.gymFollowerRepository.update(
      { gymId, followerUserId: userId },
      { blocked: false, blockedDate: null },
    );
  }
}
