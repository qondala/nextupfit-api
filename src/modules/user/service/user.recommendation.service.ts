import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { UserRecommendationEntity } from "../entity";
import { CreateUserRecommendationDto, UpdateUserRecommendationDto } from "../dto";


@Injectable()
export class UserRecommendationService {
  constructor(
    @InjectRepository(UserRecommendationEntity)
    private readonly userRecommendationRepository: Repository<UserRecommendationEntity>
  ) {}

  async create(createUserRecommendationDto: CreateUserRecommendationDto): Promise<UserRecommendationEntity> {
    const userRecommendation = this.userRecommendationRepository.create(createUserRecommendationDto);
    return await this.userRecommendationRepository.save(userRecommendation);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserRecommendationEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userRecommendationRepository.findAndCount({
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

  async findOne(id: number): Promise<UserRecommendationEntity> {
    const userRecommendation = await this.userRecommendationRepository.findOne({ where: { id } });
    if (!userRecommendation) {
      throw new Error(`User recommendation with ID ${id} not found`);
    }
    return userRecommendation;
  }

  async update(id: number, updateUserRecommendationDto: UpdateUserRecommendationDto): Promise<UserRecommendationEntity> {
    const userRecommendation = await this.findOne(id);
    Object.assign(userRecommendation, updateUserRecommendationDto);
    return await this.userRecommendationRepository.save(userRecommendation);
  }

  async remove(id: number): Promise<void> {
    const userRecommendation = await this.findOne(id);
    await this.userRecommendationRepository.remove(userRecommendation);
  }

  async findByRecommenderId(recommenderId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserRecommendationEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userRecommendationRepository.findAndCount({
      where: { recommenderUserId: recommenderId },
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

  async findByRecommendeeId(recommendeeId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserRecommendationEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userRecommendationRepository.findAndCount({
      where: { recommendeeUserId: recommendeeId },
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
}
