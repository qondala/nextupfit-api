import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode,
} from "@app/common/exceptions";

import { UserCommitmentEntity } from "../entity";
import { CreateUserCommitmentDto, UpdateUserCommitmentDto } from "../dto";

@Injectable()
export class UserCommitmentService {
  constructor(
    @InjectRepository(UserCommitmentEntity)
    private readonly userCommitmentRepository: Repository<UserCommitmentEntity>
  ) {}

  async create(dto: CreateUserCommitmentDto): Promise<UserCommitmentEntity> {
    const entity = this.userCommitmentRepository.create(dto);
    return this.userCommitmentRepository.save(entity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserCommitmentEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userCommitmentRepository.findAndCount({
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

  async getUserCommitments(userId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserCommitmentEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userCommitmentRepository.findAndCount({
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


  async findOne(id: number): Promise<UserCommitmentEntity> {
    const entity = await this.userCommitmentRepository.findOne({ where: { id } });
    if (!entity) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `User commitment with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND
      );
    }
    return entity;
  }

  async update(id: number, dto: UpdateUserCommitmentDto): Promise<UserCommitmentEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.userCommitmentRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.userCommitmentRepository.remove(entity);
  }
}
