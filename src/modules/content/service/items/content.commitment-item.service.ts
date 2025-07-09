import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentCommitmentItemEntity } from "../../entity/items";
import { CreateContentCommitmentItemDto, UpdateContentCommitmentItemDto } from "../../dto";

@Injectable()
export class ContentCommitmentItemService {
  constructor(
    @InjectRepository(ContentCommitmentItemEntity)
    private readonly repository: Repository<ContentCommitmentItemEntity>,
  ) {}

  async create(dto: CreateContentCommitmentItemDto): Promise<ContentCommitmentItemEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentCommitmentItemEntity>> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { position: "ASC" },
    });
    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<ContentCommitmentItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Commitment item ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentCommitmentItemDto): Promise<ContentCommitmentItemEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
