import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode,
} from "@app/common/exceptions";

import { UserConsumptionItemEntity } from "../entity";
import { CreateUserConsumptionItemDto, UpdateUserConsumptionItemDto } from "../dto";

@Injectable()
export class UserConsumptionItemService {
  constructor(
    @InjectRepository(UserConsumptionItemEntity)
    private readonly repository: Repository<UserConsumptionItemEntity>
  ) {}

  async create(dto: CreateUserConsumptionItemDto): Promise<UserConsumptionItemEntity> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserConsumptionItemEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.repository.findAndCount({ skip, take: limit, order: { createdAt: "DESC" } });

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

  async findOne(id: number): Promise<UserConsumptionItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `User consumption item with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND
      );
    }
    return entity;
  }

  async update(id: number, dto: UpdateUserConsumptionItemDto): Promise<UserConsumptionItemEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
