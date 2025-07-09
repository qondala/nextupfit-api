import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  FindOrderByEnum,
  InterestPaginationDto,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { UserInterestEntity } from "@app/module/user/entity";
import { UserInterestService } from "@app/module/user/service";

import {
  GymManagerEntity,
  GymManagerInterestEntity
} from "../entity";

import {
  CreateGymManagerInterestDto,
  UpdateGymManagerInterestDto,
  GymFindCriteriaManagerInterestDto,
} from "../dto";


@Injectable()
export class GymManagerInterestService {
  constructor(
    @InjectRepository(GymManagerInterestEntity)
    private readonly repository: Repository<GymManagerInterestEntity>,
    private readonly userInterestsService: UserInterestService,
  ) {}

  async create(body: CreateGymManagerInterestDto): Promise<GymManagerInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(criteria: GymFindCriteriaManagerInterestDto, pagination?: PaginationOptionsDto): Promise<PaginatedResponseDto<GymManagerInterestEntity>> {
    
    const queryBuilder = this.repository.createQueryBuilder("gymManagerInterest");
    
    queryBuilder.where("gymManagerInterest.id != 0");
    
    if (criteria.interestType) {
      queryBuilder.andWhere("gymManagerInterest.interestType = :interestType", { interestType: criteria.interestType });
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("gymManagerInterest.interestId = :interestId", { interestId: criteria.interestId });
    }
    if (criteria.managerId) {
      queryBuilder.andWhere("gymManagerInterest.managerId = :managerId", { managerId: criteria.managerId });
    }
    
    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy('RANDOM()');
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy('gymManagerInterest.createdAt', 'DESC');
          break;
        default:
          queryBuilder.addOrderBy('gymManagerInterest.createdAt', 'DESC');
          break;
      }
    }
    
    const { page, limit } = pagination || { page: 1, limit: 10 };

    const skip = (page - 1) * limit;
    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<GymManagerInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(id: number, body: UpdateGymManagerInterestDto): Promise<GymManagerInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });

    Object.assign(interest, body);
    return await this.repository.save(interest);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async getUserInterests(userId: number, pagination: InterestPaginationDto): Promise<UserInterestEntity[]> {
    const interests = await this.userInterestsService.findAll(userId, pagination.user);
    return interests.items;
  }

  async getManagersByUserInterests(userId: number, pagination: InterestPaginationDto): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const userInterests = await this.getUserInterests(userId, pagination);

    const managers: GymManagerEntity[] = [];
    const managerIds: number[] = [];

    // Loop through user interests
    for (const userInterest of userInterests) {

      // And find managers with that interest
      const managersInterests = await this.findAll(
        {
          interestId: userInterest.interestId,
          interestType: userInterest.interestType,
        },
        pagination.local
      );

      managersInterests.items.forEach(interest => {
        if (!managerIds.includes(interest.manager.id)) {
          managerIds.push(interest.manager.id);
          managers.push(interest.manager);
        }
      });
    }

    return {
      items: managers,
      meta: {
        totalItems: managers.length,
        itemCount: managers.length,
        itemsPerPage: 99,
        totalPages: 1,
        currentPage: 1
      }
    };
  }
}
