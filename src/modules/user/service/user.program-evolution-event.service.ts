import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, MoreThan, Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  ProgramEvolutionEventTypeEnum,
  ProgramItemTypeEnum,
} from "@app/module/program/types";
import { SocialActorEnum } from "@app/module/social/types";

import { UserProgramEvolutionEntity } from "../entity";
import {
  CreateUserProgramEvolutionEventDto,
  UpdateUserProgramEvolutionDto,
} from "../dto";



@Injectable()
export class UserProgramEvolutionService {
  constructor(
    @InjectRepository(UserProgramEvolutionEntity)
    private readonly userProgramEvolutionRepository: Repository<UserProgramEvolutionEntity>
  ) {}

  async create(createUserProgramEvolutionDto: CreateUserProgramEvolutionEventDto): Promise<UserProgramEvolutionEntity> {
    const userProgramEvolution = this.userProgramEvolutionRepository.create(createUserProgramEvolutionDto);
    return await this.userProgramEvolutionRepository.save(userProgramEvolution);
  }

  async findAll(
    userId: number,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserProgramEvolutionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userProgramEvolutionRepository.findAndCount({
      where: { userId, receiverType: SocialActorEnum.user },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<UserProgramEvolutionEntity> {
    const userProgramEvolution = await this.userProgramEvolutionRepository.findOne({ where: { id } });
    return userProgramEvolution;
  }

  async update(id: number, updateUserProgramEvolutionDto: UpdateUserProgramEvolutionDto): Promise<UserProgramEvolutionEntity> {
    const userProgramEvolution = await this.findOne(id);
    Object.assign(userProgramEvolution, updateUserProgramEvolutionDto);
    return await this.userProgramEvolutionRepository.save(userProgramEvolution);
  }

  async remove(id: number): Promise<void> {
    const userProgramEvolution = await this.findOne(id);
    await this.userProgramEvolutionRepository.remove(userProgramEvolution);
  }



  async findByType(
    userId: number,
    eventType: ProgramItemTypeEnum,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserProgramEvolutionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userProgramEvolutionRepository.findAndCount({
      where: { userId, programItem: eventType, receiverType: SocialActorEnum.user },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findByItemIdAndType(
    userId: number,
    itemId: number,
    eventType: ProgramItemTypeEnum,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserProgramEvolutionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userProgramEvolutionRepository.findAndCount({
      where: { userId, programItem: eventType, programItemId: itemId, receiverType: SocialActorEnum.user },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }



  async findByStatus(
    userId: number,
    eventStatus: ProgramEvolutionEventTypeEnum,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserProgramEvolutionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userProgramEvolutionRepository.findAndCount({
      where: { userId, event: eventStatus, receiverType: SocialActorEnum.user },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findByTypeAndStatus(
    userId: number,
    eventType: ProgramItemTypeEnum,
    eventStatus: ProgramEvolutionEventTypeEnum,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserProgramEvolutionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userProgramEvolutionRepository.findAndCount({
      where: { userId, programItem: eventType, event: eventStatus, receiverType: SocialActorEnum.user },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async getNumberOfUserActivityEventsDoneSince(
    userId: number,
    gymId: number,
    activityId: number,
    date: Date,
  ): Promise<number> {
    return await this.userProgramEvolutionRepository.count({
      where: {
        userId,
        gymId,
        programItemId: activityId,
        programItem: ProgramItemTypeEnum.activity,
        event: ProgramEvolutionEventTypeEnum.done,
        createdAt: MoreThan(date),
      },
    });
  }

  async didUserEverStartedOrCompleted(
    userId: number,
    programItemId: number,
    eventType: ProgramItemTypeEnum,
  ): Promise<boolean> {
    return await this.userProgramEvolutionRepository.findOne({
      where: {
        userId,
        programItemId,
        programItem: eventType,
        event: In([ProgramEvolutionEventTypeEnum.done, ProgramEvolutionEventTypeEnum.started]),
      },
    }) !== null;
  }
}
