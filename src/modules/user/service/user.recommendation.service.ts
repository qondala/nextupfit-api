import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";

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

  async findAll(options: PaginationOptionsDto): Promise<[UserRecommendationEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.userRecommendationRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
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

  async findByRecommenderId(recommenderId: number, options: PaginationOptionsDto): Promise<[UserRecommendationEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.userRecommendationRepository.findAndCount({
      where: { recommenderUserId: recommenderId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findByRecommendeeId(recommendeeId: number, options: PaginationOptionsDto): Promise<[UserRecommendationEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.userRecommendationRepository.findAndCount({
      where: { recommendeeUserId: recommendeeId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }
}
