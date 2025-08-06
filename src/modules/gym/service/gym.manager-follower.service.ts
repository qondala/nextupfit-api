import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateGymManagerFollowerDto,
  UpdateGymManagerFollowerDto,
} from "../dto";
import { GymManagerFollowerEntity } from "../entity";

@Injectable()
export class GymManagerFollowerService {
  constructor(
    @InjectRepository(GymManagerFollowerEntity)
    private readonly repository: Repository<GymManagerFollowerEntity>,
  ) {}

  async create(
    createDto: CreateGymManagerFollowerDto,
  ): Promise<GymManagerFollowerEntity> {
    if (await this.isFollowing(createDto.followerUserId, createDto.managerId)) {
      throw new ConflictException(
        `User ${createDto.followerUserId} is already a follower of Gym ${createDto.managerUserId}`,
      );
    }

    const follower = this.repository.create(createDto);
    return await this.repository.save(follower);
  }

  async isFollowing(
    userId: number,
    managerId: number,
  ): Promise<GymManagerFollowerEntity> {
    const follower = await this.repository.findOne({
      where: { managerId, followerUserId: userId },
    });
    return follower;
  }

  async findAllFollowersOfManager(
    managerId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerFollowerEntity>> {
    const queryBuilder = this.repository
      .createQueryBuilder("mfollower")
      .where("mfollower.managerId = :managerId", { managerId })
      .orderBy("mfollower.acceptedDate", "ASC");

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

  async findAllManagersFollowedByUser(
    userId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerFollowerEntity>> {
    const queryBuilder = this.repository
      .createQueryBuilder("mfollower")
      .where("mfollower.followerUserId = :userId", { userId })
      .orderBy("mfollower.acceptedDate", "ASC");

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

  async findOne(id: number): Promise<GymManagerFollowerEntity> {
    return await this.repository.findOne({
      where: { id },
      relations: ["manager", "follower"],
    });
  }

  async acceptFollower(userId: number, managerId: number): Promise<void> {
    await this.repository.update(
      { managerId, followerUserId: userId },
      { accepted: true, acceptedDate: new Date() },
    );
  }

  async stopFollowing(userId: number, managerId: number): Promise<void> {
    await this.repository.update(
      { managerId, followerUserId: userId },
      { stopped: true, stoppedDate: new Date() },
    );
  }

  async rejectFollower(userId: number, managerId: number): Promise<void> {
    await this.repository.update(
      { managerId, followerUserId: userId },
      { rejected: true, rejectedDate: new Date() },
    );
  }

  async blockFollower(managerId: number, userId: number): Promise<void> {
    await this.repository.update(
      { managerId, followerUserId: userId },
      { blocked: true, blockedDate: new Date() },
    );
  }

  async unblockFollower(managerId: number, userId: number): Promise<void> {
    await this.repository.update(
      { managerId, followerUserId: userId },
      { blocked: false, blockedDate: null },
    );
  }
}
