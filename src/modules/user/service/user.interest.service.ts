import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  BaseNutritionEntity,
  BaseProgramGoalEntity,
  BaseSociologyEntity,
  BaseWorkoutEntity,
} from "@app/module/base/entity";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { UserInterestEntity } from "../entity";
import { CreateUserInterestDto, UpdateUserInterestDto } from "../dto";
import { UserInterestCompositeDto, UserInterestTypeEnum } from "../types";

@Injectable()
export class UserInterestService {
  constructor(
    @InjectRepository(UserInterestEntity)
    private readonly userInterestRepository: Repository<UserInterestEntity>,
    @InjectRepository(BaseNutritionEntity)
    private readonly nutritionRepository: Repository<BaseNutritionEntity>,
    @InjectRepository(BaseProgramGoalEntity)
    private readonly programGoalRepository: Repository<BaseProgramGoalEntity>,
    @InjectRepository(BaseSociologyEntity)
    private readonly sociologyRepository: Repository<BaseSociologyEntity>,
    @InjectRepository(BaseWorkoutEntity)
    private readonly workoutRepository: Repository<BaseWorkoutEntity>,
  ) {}

  async create(createDto: CreateUserInterestDto): Promise<UserInterestEntity> {
    const newEntity = this.userInterestRepository.create(createDto);
    return await this.userInterestRepository.save(newEntity);
  }

  async createMany(createDto: CreateUserInterestDto[]): Promise<UserInterestEntity[]> {
    const newEntities = this.userInterestRepository.create(createDto);
    return await this.userInterestRepository.save(newEntities);
  }

  async findAll(userId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserInterestEntity>> {
    const [items, total] = await this.userInterestRepository.findAndCount({
      where: { userId },
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { id: "DESC" },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page,
      },
    };
  }

  async findOne(id: number): Promise<UserInterestEntity | null> {
    return await this.userInterestRepository.findOneBy({ id });
  }

  async getUserInterestComposite(interestId: number, interestType: UserInterestTypeEnum): Promise<UserInterestCompositeDto> {
    const interest: UserInterestCompositeDto = {
      nutrition: null,
      programGoal: null,
      sociology: null,
      workout: null,
    };

    switch (interestType) {
      case UserInterestTypeEnum.nutrition:
        interest.nutrition = await this.nutritionRepository.findOneBy({ id: interestId });
        break;
      case UserInterestTypeEnum.programGoal:
        interest.programGoal = await this.programGoalRepository.findOneBy({ id: interestId });
        break;
      case UserInterestTypeEnum.sociology:
        interest.sociology = await this.sociologyRepository.findOneBy({ id: interestId });
        break;
      case UserInterestTypeEnum.workout:
        interest.workout = await this.workoutRepository.findOneBy({ id: interestId });
        break;
    }
    
    return interest;
  }

  async update(id: number, updateDto: UpdateUserInterestDto): Promise<UserInterestEntity | null> {
    const result = await this.userInterestRepository.update(id, updateDto);
    if (result.affected === 0) return null;
    return await this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userInterestRepository.delete(id);
    return result.affected > 0;
  }
}
