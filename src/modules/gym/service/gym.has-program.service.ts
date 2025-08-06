import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ProgramItemTypeEnum } from "@app/module/program/types";
import { ProgramService } from "@app/module/program/service";

import { CreateGymHasProgramDto, UpdateGymHasProgramDto } from "../dto";
import { GymHasProgramEntity } from "../entity";

@Injectable()
export class GymHasProgramService {
  constructor(
    @InjectRepository(GymHasProgramEntity)
    private readonly repository: Repository<GymHasProgramEntity>,
    private readonly programService: ProgramService,
  ) {}

  async create(
    createDto: CreateGymHasProgramDto,
  ): Promise<GymHasProgramEntity> {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity);
  }

  async findAll(
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymHasProgramEntity>> {
    const queryBuilder = this.repository
      .createQueryBuilder("gymHasProgram")
      .leftJoinAndSelect("gymHasProgram.gym", "gym")
      .leftJoinAndSelect("gymHasProgram.manager", "manager")
      .orderBy("gymHasProgram.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    for (const item of items) {
      item.item = await this.programService.getProgramItem(
        item.itemType,
        item.itemId,
      );
    }

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }

  async findOne(id: number): Promise<GymHasProgramEntity> {
    const record = await this.repository.findOne({
      where: { id },
      relations: ["gym", "manager"],
    });

    if (record) {
      record.item = await this.programService.getProgramItem(
        record.itemType,
        record.itemId,
      );
    }
    return record;
  }

  async update(
    id: number,
    updateDto: UpdateGymHasProgramDto,
  ): Promise<GymHasProgramEntity> {
    await this.repository.update({ id }, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({ id });
    return;
  }

  async findByGymId(
    gymId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymHasProgramEntity>> {
    const queryBuilder = this.repository
      .createQueryBuilder("gymHasProgram")
      .leftJoinAndSelect("gymHasProgram.gym", "gym")
      .leftJoinAndSelect("gymHasProgram.manager", "manager")
      .where("gymHasProgram.gymId = :gymId", { gymId })
      .orderBy("gymHasProgram.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    for (const item of items) {
      item.item = await this.programService.getProgramItem(
        item.itemType,
        item.itemId,
      );
    }

    const totalPages = Math.ceil(totalItems / pagination.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }

  async findByManagerId(
    owerManagerId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymHasProgramEntity>> {
    const queryBuilder = this.repository
      .createQueryBuilder("gymHasProgram")
      .leftJoinAndSelect("gymHasProgram.gym", "gym")
      .leftJoinAndSelect("gymHasProgram.manager", "manager")
      .where("gymHasProgram.owerManagerId = :owerManagerId", { owerManagerId })
      .orderBy("gymHasProgram.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    for (const item of items) {
      item.item = await this.programService.getProgramItem(
        item.itemType,
        item.itemId,
      );
    }

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }

  async findByGymIdAndManagerId(
    gymId: number,
    managerId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymHasProgramEntity>> {
    const queryBuilder = this.repository
      .createQueryBuilder("gymHasProgram")
      .leftJoinAndSelect("gymHasProgram.gym", "gym")
      .leftJoinAndSelect("gymHasProgram.manager", "manager")
      .where("gymHasProgram.gymId = :gymId", { gymId })
      .andWhere("gymHasProgram.managerId = :managerId", { managerId })
      .orderBy("gymHasProgram.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    for (const item of items) {
      item.item = await this.programService.getProgramItem(
        item.itemType,
        item.itemId,
      );
    }

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }

  async findByItemTypeAndManagerId(
    itemType: ProgramItemTypeEnum,
    managerId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymHasProgramEntity>> {
    const queryBuilder = this.repository
      .createQueryBuilder("gymHasProgram")
      .leftJoinAndSelect("gymHasProgram.gym", "gym")
      .leftJoinAndSelect("gymHasProgram.manager", "manager")
      .where("gymHasProgram.itemType = :itemType", { itemType })
      .andWhere("gymHasProgram.managerId = :managerId", { managerId })
      .orderBy("gymHasProgram.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    for (const item of items) {
      item.item = await this.programService.getProgramItem(
        item.itemType,
        item.itemId,
      );
    }

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }

  async findByItemTypeAndGymId(
    itemType: ProgramItemTypeEnum,
    gymId: number,
    pagination: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymHasProgramEntity>> {
    const queryBuilder = this.repository
      .createQueryBuilder("gymHasProgram")
      .leftJoinAndSelect("gymHasProgram.gym", "gym")
      .leftJoinAndSelect("gymHasProgram.manager", "manager")
      .where("gymHasProgram.itemType = :itemType", { itemType })
      .andWhere("gymHasProgram.gymId = :gymId", { gymId })
      .orderBy("gymHasProgram.createdAt", "DESC");

    const skip = (pagination.page - 1) * pagination.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(pagination.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / pagination.limit);

    for (const item of items) {
      item.item = await this.programService.getProgramItem(
        item.itemType,
        item.itemId,
      );
    }

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: pagination.limit,
        totalPages,
        currentPage: pagination.page,
      },
    };
  }

  async findOneByManagerIdAndGymId(
    owerManagerId: number,
    gymId: number,
  ): Promise<GymHasProgramEntity> {
    const record = await this.repository.findOne({
      where: { owerManagerId, gymId },
      relations: ["gym", "manager"],
    });

    if (record) {
      record.item = await this.programService.getProgramItem(
        record.itemType,
        record.itemId,
      );
    }
    return record;
  }

  async updateByManagerIdAndGymId(
    owerManagerId: number,
    gymId: number,
    updateDto: UpdateGymHasProgramDto,
  ): Promise<GymHasProgramEntity> {
    await this.repository.update({ gymId, owerManagerId }, updateDto);
    return this.findOneByManagerIdAndGymId(owerManagerId, gymId);
  }
}
