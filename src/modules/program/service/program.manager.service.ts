import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import { GymManagerEntity } from "@app/module/gym/entity";

import { ProgramManagerEntity } from "../entity";
import { ProgramItemTypeEnum } from "../types";
import { CreateProgramManagerDto, UpdateProgramManagerDto } from "../dto";


@Injectable()
export class ProgramManagerService {
  constructor(
    @InjectRepository(ProgramManagerEntity)
    private readonly programManagerRepository: Repository<ProgramManagerEntity>,
    @InjectRepository(GymManagerEntity)
    private readonly gymManagerRepository: Repository<GymManagerEntity>
  ) {}

  async create(createProgramManagerDto: CreateProgramManagerDto): Promise<ProgramManagerEntity> {
    const programManager = this.programManagerRepository.create(createProgramManagerDto);
    return await this.programManagerRepository.save(programManager);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramManagerEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programManagerRepository.createQueryBuilder("programManager");

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy("programManager.createdAt", "DESC")
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

  async findOne(id: number): Promise<ProgramManagerEntity> {
    const programManager = await this.programManagerRepository.findOne({ where: { id } });
    if (!programManager) {
      throw new Error(`Program manager with ID ${id} not found`);
    }
    return programManager;
  }

  async findByManagerId(managerId: number): Promise<ProgramManagerEntity[]> {
    return await this.programManagerRepository.find({ where: { managerId } });
  }

  async findByItemTypeAndItemId(itemType: ProgramItemTypeEnum, itemId: number): Promise<ProgramManagerEntity[]> {
    return await this.programManagerRepository.find({ where: { itemType, itemId } });
  }

  async update(id: number, updateProgramManagerDto: UpdateProgramManagerDto): Promise<ProgramManagerEntity> {
    const programManager = await this.findOne(id);
    Object.assign(programManager, updateProgramManagerDto);
    return await this.programManagerRepository.save(programManager);
  }

  async remove(id: number): Promise<void> {
    await this.programManagerRepository.delete(id);
  }


  /**
   * Fetches the managers of a program item, which are among gym managers.
   * 
   * @param itemId The ID of the program item.
   * @param itemType The type of the program item.
   * @returns An array of gym managers.
   */
  async fetchProgramItemManagers(itemId: number, itemType: ProgramItemTypeEnum): Promise<GymManagerEntity[]> {
    const managers = await this.programManagerRepository.find({
      where: {
        itemType,
        itemId
      }
    });

    const gymManagers = [];
    for (const manager of managers) {
      const gymManager = this.gymManagerRepository.findOne({
        where: { id: manager.managerId },
        relations: [
          'overview',
        ]
      });
      gymManagers.push(gymManager);
    }

    return gymManagers;
  }


}
