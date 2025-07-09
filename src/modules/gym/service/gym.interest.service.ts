import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  FindOrderByEnum,
  InterestPaginationDto,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { UserInterestService } from "@app/module/user/service";

import { GymEntity, GymInterestEntity } from "../entity";
import {
  CreateGymInterestDto,
  UpdateGymInterestDto,
  GymFindCriteriaInterestDto,
} from "../dto";
import { UserInterestEntity } from "@app/module/user/entity";

@Injectable()
export class GymInterestService {
  constructor(
    @InjectRepository(GymInterestEntity)
    private readonly repository: Repository<GymInterestEntity>,
    private readonly userInterestsService: UserInterestService,
  ) {}

  async create(body: CreateGymInterestDto): Promise<GymInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(criteria: GymFindCriteriaInterestDto, pagination?: PaginationOptionsDto): Promise<PaginatedResponseDto<GymInterestEntity>> {
    
    const queryBuilder = this.repository.createQueryBuilder("gymInterest");
    
    queryBuilder.where("gymInterest.id != 0");
    
    if (criteria.interestType) {
      queryBuilder.andWhere("gymInterest.interestType = :interestType", { interestType: criteria.interestType });
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("gymInterest.interestId = :interestId", { interestId: criteria.interestId });
    }
    if (criteria.gymId) {
      queryBuilder.andWhere("gymInterest.gymId = :gymId", { gymId: criteria.gymId });
    }
    
    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy('RANDOM()');
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy('gymInterest.createdAt', 'DESC');
          break;
        default:
          queryBuilder.addOrderBy('gymInterest.createdAt', 'DESC');
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

  async findOne(id: number): Promise<GymInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }

  async update(id: number, body: UpdateGymInterestDto): Promise<GymInterestEntity> {
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

  async getGymsByUserInterests(userId: number, pagination: InterestPaginationDto): Promise<PaginatedResponseDto<GymEntity>> {
    const userInterests = await this.getUserInterests(userId, pagination);

    const gyms: GymEntity[] = [];
    const gymIds: number[] = [];

    // Loop through user interests
    for (const userInterest of userInterests) {

      // And find gyms with that interest
      const gymsInterests = await this.findAll(
        {
          interestId: userInterest.interestId,
          interestType: userInterest.interestType,
        },
        pagination.local
      );

      gymsInterests.items.forEach(interest => {
        if (!gymIds.includes(interest.gym.id)) {
          gymIds.push(interest.gym.id);
          gyms.push(interest.gym);
        }
      });
    }

    return {
      items: gyms,
      meta: {
        totalItems: gyms.length,
        itemCount: gyms.length,
        itemsPerPage: 99,
        totalPages: 1,
        currentPage: 1
      }
    };
  }
}
