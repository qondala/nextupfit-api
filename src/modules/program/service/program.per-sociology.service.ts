import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ProgramPerSociologyEntity } from "../entity";
import { CreateProgramPerSociologyDto, UpdateProgramPerSociologyDto } from "../dto";
import { ProgramItemTypeEnum } from "../types";
import { BaseSociologyEntity } from "@app/module/base/entity";

@Injectable()
export class ProgramPerSociologyService {
  constructor(
    @InjectRepository(ProgramPerSociologyEntity)
    private readonly programPerSociologyRepository: Repository<ProgramPerSociologyEntity>,
    @InjectRepository(BaseSociologyEntity)
    private readonly baseSociologyRepository: Repository<BaseSociologyEntity>
  ) {}

  async create(createProgramPerSociologyDto: CreateProgramPerSociologyDto): Promise<ProgramPerSociologyEntity> {
    const programPerSociology = this.programPerSociologyRepository.create(createProgramPerSociologyDto);
    return await this.programPerSociologyRepository.save(programPerSociology);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramPerSociologyEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programPerSociologyRepository.createQueryBuilder("programPerSociology");

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy("programPerSociology.createdAt", "DESC")
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<ProgramPerSociologyEntity> {
    const programPerSociology = await this.programPerSociologyRepository.findOne({ where: { id } });
    if (!programPerSociology) {
      throw new Error(`Program per sociology with ID ${id} not found`);
    }
    return programPerSociology;
  }

  async update(id: number, updateProgramPerSociologyDto: UpdateProgramPerSociologyDto): Promise<ProgramPerSociologyEntity> {
    const programPerSociology = await this.findOne(id);
    Object.assign(programPerSociology, updateProgramPerSociologyDto);
    return await this.programPerSociologyRepository.save(programPerSociology);
  }

  async remove(id: number): Promise<void> {
    await this.programPerSociologyRepository.delete(id);
  }


  /**
   * Fetches the sociology of a program item.
   * 
   * @param itemId The ID of the program item.
   * @param itemType The type of the program item.
   * @returns An array of sociology.
   */
  async fetchProgramItemSociology(itemId: number, itemType: ProgramItemTypeEnum): Promise<BaseSociologyEntity[]> {
    const programPerSociologies = await this.programPerSociologyRepository.find({
      where: {
        itemType,
        itemId
      }
    });

    const audience = [];
    for (const programPerSociology of programPerSociologies) {
      const sociology = this.baseSociologyRepository.findOne({
        where: { id: programPerSociology.baseSociologyId },
      });
      audience.push(sociology);
    }

    return audience;
  }
}
