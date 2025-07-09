import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { UserCommitmentCompletedItemEntity } from "../entity";
import {
  CreateUserCommitmentCompletedItemDto,
  UpdateUserCommitmentCompletedItemDto,
} from "../dto";

@Injectable()
export class UserCommitmentCompletedItemService {
  constructor(
    @InjectRepository(UserCommitmentCompletedItemEntity)
    private readonly repo: Repository<UserCommitmentCompletedItemEntity>
  ) {}

  async create(dto: CreateUserCommitmentCompletedItemDto): Promise<UserCommitmentCompletedItemEntity> {
    const entity = this.repo.create(dto);
    const saved = await this.repo.save(entity);
    return saved;
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserCommitmentCompletedItemEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.repo.findAndCount({ skip, take: limit, order: { createdAt: "DESC" } });

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

  async findOne(id: number): Promise<UserCommitmentCompletedItemEntity> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity;
  }

  async update(id: number, dto: UpdateUserCommitmentCompletedItemDto): Promise<UserCommitmentCompletedItemEntity> {
    const entity = await this.findOne(id);
    await this.repo.update(id, dto);
    return entity;
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
