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

import { ProgramEntity, ProgramFreetoolInterestEntity, ProgramStepActivityEntity } from "../entity";
import {
  CreateProgramFreetoolInterestDto,
  UpdateProgramFreetoolInterestDto,
  ProgramFindCriteriaInterestDto,
} from "../dto";

import { UserInterestEntity } from "@app/module/user/entity";



@Injectable()
export class ProgramFreetoolInterestService {
  constructor(
    @InjectRepository(ProgramFreetoolInterestEntity)
    private readonly repository: Repository<ProgramFreetoolInterestEntity>,
    private readonly userInterestsService: UserInterestService,
  ) {}

  async create(body: CreateProgramFreetoolInterestDto): Promise<ProgramFreetoolInterestEntity> {
    const interest = this.repository.create(body);
    return await this.repository.save(interest);
  }

  async findAll(criteria: ProgramFindCriteriaInterestDto, pagination?: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramFreetoolInterestEntity>> {
    
    const queryBuilder = this.repository.createQueryBuilder("programInterest");
    
    queryBuilder.where("programInterest.id != 0");
    
    if (criteria.interestType) {
      queryBuilder.andWhere("programInterest.interestType = :interestType", { interestType: criteria.interestType });
    }
    if (criteria.interestId) {
      queryBuilder.andWhere("programInterest.interestId = :interestId", { interestId: criteria.interestId });
    }
    if (criteria.programId) {
      queryBuilder.andWhere("programInterest.programId = :programId", { programId: criteria.programId });
    }
    
    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case FindOrderByEnum.random:
          queryBuilder.addOrderBy('RANDOM()');
          break;
        case FindOrderByEnum.date:
          queryBuilder.addOrderBy('programInterest.createdAt', 'DESC');
          break;
        default:
          queryBuilder.addOrderBy('programInterest.createdAt', 'DESC');
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

  async findOne(id: number): Promise<ProgramFreetoolInterestEntity> {
    const interest = await this.repository.findOne({
      where: { id },
    });
    return interest;
  }


  async update(id: number, body: UpdateProgramFreetoolInterestDto): Promise<ProgramFreetoolInterestEntity> {
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

  async getFreetoolsByUserInterests(userId: number, pagination: InterestPaginationDto): Promise<PaginatedResponseDto<ProgramStepActivityEntity>> {
    const userInterests = await this.getUserInterests(userId, pagination);

    const activities: ProgramStepActivityEntity[] = [];
    const activityIds: number[] = [];

    // Loop through user interests
    for (const userInterest of userInterests) {

      // And find programs with that interest
      const activitiesInterests = await this.findAll(
        {
          interestId: userInterest.interestId,
          interestType: userInterest.interestType,
        },
        pagination.local
      );

      activitiesInterests.items.forEach(interest => {
        if (!activityIds.includes(interest.activity.id)) {
          activityIds.push(interest.activity.id);
          activities.push(interest.activity);
        }
      });
    }

    return {
      items: activities,
      meta: {
        totalItems: activities.length,
        itemCount: activities.length,
        itemsPerPage: 99,
        totalPages: 1,
        currentPage: 1
      }
    };
  }
}
