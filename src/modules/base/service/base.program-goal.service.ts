import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { BaseProgramGoalEntity } from "../entity";
import { CreateBaseProgramGoalDto, UpdateBaseProgramGoalDto } from "../dto";

@Injectable()
export class BaseProgramGoalService {
  constructor(
    @InjectRepository(BaseProgramGoalEntity)
    private readonly baseProgramGoalRepository: Repository<BaseProgramGoalEntity>,
  ) {}

  async create(createDto: CreateBaseProgramGoalDto): Promise<BaseProgramGoalEntity> {
    const newEntity = this.baseProgramGoalRepository.create(createDto);
    return this.baseProgramGoalRepository.save(newEntity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<BaseProgramGoalEntity>> {
    const [items, total] = await this.baseProgramGoalRepository.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { id: "DESC" },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page,
      },
    };
  }

  async findOne(id: number): Promise<BaseProgramGoalEntity | null> {
    return this.baseProgramGoalRepository.findOneBy({ id });
  }

  async update(id: number, updateDto: UpdateBaseProgramGoalDto): Promise<BaseProgramGoalEntity | null> {
    const result = await this.baseProgramGoalRepository.update(id, updateDto);
    if (result.affected === 0) return null;
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseProgramGoalRepository.delete(id);
    return result.affected > 0;
  }
}
