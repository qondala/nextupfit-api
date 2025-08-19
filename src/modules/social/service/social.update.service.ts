import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, In, Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import { GymFollowerEntity, GymManagerFollowerEntity } from "@app/module/gym/entity";

import {
  CreateSocialUpdateDto,
  UpdateSocialUpdateDto,
  SocialUpdatesFindCriteriaDto,
  SocialUpdatesFindOrderEnum,
} from "../dto";

import { SocialUpdateEntity } from "../entity";
import { UserInterestEntity } from "@app/module/user/entity";
import { SocialActorEnum } from "../types";

@Injectable()
export class SocialUpdateService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(SocialUpdateEntity)
    private readonly socialUpdateRepository: Repository<SocialUpdateEntity>,
    @InjectRepository(GymFollowerEntity)
    private readonly gymFollowerRepository: Repository<GymFollowerEntity>,
    @InjectRepository(GymManagerFollowerEntity)
    private readonly gymManagerFollowerRepository: Repository<GymManagerFollowerEntity>,
  ) {}

  async create(createDto: CreateSocialUpdateDto): Promise<SocialUpdateEntity> {
    const entity = this.socialUpdateRepository.create(createDto);
    return await this.socialUpdateRepository.save(entity);
  }

  async findAll(
    criteria: SocialUpdatesFindCriteriaDto,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialUpdateEntity>> {
    const queryBuilder = this.socialUpdateRepository
      .createQueryBuilder("socialUpdate")
      .leftJoinAndSelect("socialUpdate.authorUser", "authorUser")
      .leftJoinAndSelect("socialUpdate.authorManager", "authorManager");

    if (criteria.authorUserId) {
      queryBuilder.andWhere("socialUpdate.authorUserId = :authorUserId", {
        authorUserId: criteria.authorUserId,
      });
    }

    if (criteria.authorManagerId) {
      queryBuilder.andWhere("socialUpdate.authorManagerId = :authorManagerId", {
        authorManagerId: criteria.authorManagerId,
      });
    }

    if (criteria.socialActorType) {
      queryBuilder.andWhere("socialUpdate.socialActorType = :socialActorType", {
        socialActorType: criteria.socialActorType,
      });
    }

    if (criteria.socialActorId) {
      queryBuilder.andWhere("socialUpdate.socialActorId = :socialActorId", {
        socialActorId: criteria.socialActorId,
      });
    }

    if (criteria.socialUpdateType) {
      queryBuilder.andWhere(
        "socialUpdate.socialUpdateType = :socialUpdateType",
        { socialUpdateType: criteria.socialUpdateType },
      );
    }

    if (criteria.privacy) {
      queryBuilder.andWhere("socialUpdate.privacy = :privacy", {
        privacy: criteria.privacy,
      });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case SocialUpdatesFindOrderEnum.date:
          queryBuilder.orderBy("socialUpdate.createdAt", "DESC");
          break;
        case SocialUpdatesFindOrderEnum.random:
          queryBuilder.orderBy("RANDOM()");
          break;
      }
    }

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

  async fetchUserTimelineUpdates(userId: number, paginationOptions: PaginationOptionsDto): Promise<PaginatedResponseDto<SocialUpdateEntity>> {
    const p1 = this.fetchUserFollowedManagersUpdates(userId, paginationOptions);
    const p2 = this.fetchUserFollowedGymsUpdates(userId, paginationOptions);
    const p3 = this.findUserInterestedUpdates(userId, paginationOptions);
    const [p1Result, p2Result, p3Result] = await Promise.all([p1, p2, p3]);
    const items = [...p1Result.items, ...p2Result.items, ...p3Result.items];
    const totalItems = p1Result.meta.totalItems + p2Result.meta.totalItems + p3Result.meta.totalItems;
    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    // Sort items by date
    const sortedItems = items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return {
      items: sortedItems,
      meta: {
        totalItems,
        itemCount: sortedItems.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    }
  }

  async fetchManagerTimelineUpdates(managerId: number, paginationOptions: PaginationOptionsDto): Promise<PaginatedResponseDto<SocialUpdateEntity>> {
    const queryBuilder = this.socialUpdateRepository.createQueryBuilder("socialUpdate");
    queryBuilder.where({
      socialActorType: SocialActorEnum.manager,
      socialActorId: managerId,
    });
    queryBuilder.orderBy("socialUpdate.createdAt", "DESC");

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



  async fetchUserFollowedManagersUpdates(userId: number, paginationOptions: PaginationOptionsDto): Promise<PaginatedResponseDto<SocialUpdateEntity>> {
    const managerFollowers = await this.gymManagerFollowerRepository.find({
      where: { followerUserId: userId },
      relations: { manager: true },
    });

    const managers = managerFollowers.map((manager) => manager.manager);
    const managerIds = managers.map((manager) => manager.id);

    const queryBuilder = this.socialUpdateRepository.createQueryBuilder("socialUpdate");
    queryBuilder.where({
      socialActorType: SocialActorEnum.manager,
      socialActorId: In(managerIds),
    });
    queryBuilder.orderBy("socialUpdate.createdAt", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();
    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    // assing gym to each update
    items.forEach((update) => {
      update.authorManager = managers.find((manager) => manager.id === update.socialActorId);
    });
  
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

  async fetchUserFollowedGymsUpdates(userId: number, paginationOptions: PaginationOptionsDto): Promise<PaginatedResponseDto<SocialUpdateEntity>> {
    
    const gymFollowers = await this.gymFollowerRepository.find({
      where: { followerUserId: userId },
      relations: { gym: true },
    });

    const gyms = gymFollowers.map((gym) => gym.gym);
    const gymIds = gyms.map((gym) => gym.id);

    const queryBuilder = this.socialUpdateRepository.createQueryBuilder("socialUpdate");
    queryBuilder.where({
      socialActorType: SocialActorEnum.gym,
      socialActorId: In(gymIds),
    });
    queryBuilder.orderBy("socialUpdate.createdAt", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();
    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    // assing gym to each update
    items.forEach((update) => {
      update.authorGym = gyms.find((gym) => gym.id === update.socialActorId);
    });
  
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

  async findUserInterestedUpdates(
    userId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialUpdateEntity>> {
    const queryBuilder = this.dataSource
      .getRepository(SocialUpdateEntity)
      .createQueryBuilder("update")
      .leftJoinAndSelect("update.content", "content")
      .innerJoin("update.interests", "updateInterest")
      .innerJoin(
        UserInterestEntity,
        "userInterest",
        "userInterest.interestType = advertisementInterest.interestType AND userInterest.interestId = advertisementInterest.interestId",
      )
      .where("userInterest.userId = :userId", { userId });

    queryBuilder.addOrderBy("advertisement.createdAt", "DESC");
    queryBuilder.addOrderBy("RANDOM()");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }

  async findOne(id: number): Promise<SocialUpdateEntity> {
    return await this.socialUpdateRepository.findOne({
      where: { id },
      relations: ["authorUser", "authorManager"],
    });
  }

  async update(
    id: number,
    updateDto: UpdateSocialUpdateDto,
  ): Promise<SocialUpdateEntity> {
    await this.socialUpdateRepository.update({ id }, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.socialUpdateRepository.delete({ id });
    return;
  }
}
