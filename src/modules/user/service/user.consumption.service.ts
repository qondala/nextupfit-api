import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode,
} from "@app/common/exceptions";

import { UserConsumptionEntity } from "../entity";
import { CreateUserConsumptionDto, UpdateUserConsumptionDto } from "../dto";

@Injectable()
export class UserConsumptionService {
  constructor(
    @InjectRepository(UserConsumptionEntity)
    private readonly userConsumptionRepository: Repository<UserConsumptionEntity>
  ) {}

  async create(dto: CreateUserConsumptionDto): Promise<UserConsumptionEntity> {
    const entity = this.userConsumptionRepository.create(dto);
    return this.userConsumptionRepository.save(entity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserConsumptionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userConsumptionRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: "DESC" },
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

  async getUserConsumptions(userId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserConsumptionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userConsumptionRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: "DESC" },
      where: { userId }
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      }
    };
  }

  async findOne(id: number): Promise<UserConsumptionEntity> {
    const entity = await this.userConsumptionRepository.findOne({ where: { id } });
    if (!entity) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `User consumption with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND
      );
    }
    return entity;
  }

  async update(id: number, dto: UpdateUserConsumptionDto): Promise<UserConsumptionEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.userConsumptionRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.userConsumptionRepository.remove(entity);
  }


}
