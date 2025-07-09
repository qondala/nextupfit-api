import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ContentCommitmentEntity } from "../entity";
import { CreateContentCommitmentDto, UpdateContentCommitmentDto } from "../dto";

@Injectable()
export class ContentCommitmentService {
  constructor(
    @InjectRepository(ContentCommitmentEntity)
    private readonly repository: Repository<ContentCommitmentEntity>,
  ) {}

  async create(dto: CreateContentCommitmentDto): Promise<ContentCommitmentEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentCommitmentEntity>> {
    const { page = 1, limit = 10 } = options;
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "DESC" },
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

  async findOne(id: number): Promise<ContentCommitmentEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new Error(`Content commitment ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateContentCommitmentDto): Promise<ContentCommitmentEntity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
