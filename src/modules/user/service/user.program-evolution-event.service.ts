import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";

import { UserProgramEvolutionEntity } from "../entity";
import { CreateUserProgramEvolutionEventDto, UpdateUserProgramEvolutionDto } from "../dto";


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

  async findAll(options: PaginationOptionsDto): Promise<[UserProgramEvolutionEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.userProgramEvolutionRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findOne(id: number): Promise<UserProgramEvolutionEntity> {
    const userProgramEvolution = await this.userProgramEvolutionRepository.findOne({ where: { id } });
    if (!userProgramEvolution) {
      throw new Error(`User program evolution with ID ${id} not found`);
    }
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

  async findByUserId(userId: number, options: PaginationOptionsDto): Promise<[UserProgramEvolutionEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.userProgramEvolutionRepository.findAndCount({
      where: { userId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }
}
