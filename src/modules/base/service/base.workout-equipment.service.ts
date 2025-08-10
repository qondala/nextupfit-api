import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { BaseWorkoutEquipmentEntity } from "../entity";
import { CreateBaseWorkoutEquipmentDto, UpdateBaseWorkoutEquipmentDto } from "../dto";

@Injectable()
export class BaseWorkoutEquipmentService {
  constructor(
    @InjectRepository(BaseWorkoutEquipmentEntity)
    private readonly baseWorkoutEquipmentRepository: Repository<BaseWorkoutEquipmentEntity>,
  ) {}

  async create(
    createBaseWorkoutEquipmentDto: CreateBaseWorkoutEquipmentDto,
  ): Promise<BaseWorkoutEquipmentEntity> {
    const newWorkoutEquipment = this.baseWorkoutEquipmentRepository.create(
      createBaseWorkoutEquipmentDto,
    );
    return this.baseWorkoutEquipmentRepository.save(newWorkoutEquipment);
  }

  async findAll(
    options: PaginationOptionsDto,
    workoutId?: number,
    equipmentId?: number,
    mandatory?: boolean,
  ): Promise<PaginatedResponseDto<BaseWorkoutEquipmentEntity>> {
    const queryBuilder =
      this.baseWorkoutEquipmentRepository.createQueryBuilder("workoutEquipment");

    queryBuilder
      .leftJoinAndSelect("workoutEquipment.workout", "workout")
      .leftJoinAndSelect("workoutEquipment.equipment", "equipment")
      .leftJoinAndSelect("workoutEquipment.quantityUnit", "quantityUnit");

    if (workoutId) {
      queryBuilder.where("workoutEquipment.workoutId = :workoutId", { workoutId });
    }

    if (equipmentId) {
      if (workoutId) {
        queryBuilder.andWhere("workoutEquipment.equipmentId = :equipmentId", { equipmentId });
      } else {
        queryBuilder.where("workoutEquipment.equipmentId = :equipmentId", { equipmentId });
      }
    }

    if (mandatory !== undefined) {
      const whereMethod = workoutId || equipmentId ? "andWhere" : "where";
      queryBuilder[whereMethod]("workoutEquipment.mandatory = :mandatory", { mandatory });
    }

    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy("workoutEquipment.id", "DESC");

    const [items, total] = await queryBuilder.getManyAndCount();

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

  async findOne(id: number): Promise<BaseWorkoutEquipmentEntity | null> {
    return this.baseWorkoutEquipmentRepository.findOne({
      where: { id },
      relations: ["workout", "equipment", "quantityUnit"],
    });
  }

  async update(
    id: number,
    updateBaseWorkoutEquipmentDto: UpdateBaseWorkoutEquipmentDto,
  ): Promise<BaseWorkoutEquipmentEntity | null> {
    const result = await this.baseWorkoutEquipmentRepository.update(
      id,
      updateBaseWorkoutEquipmentDto,
    );

    if (result.affected === 0) {
      return null;
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseWorkoutEquipmentRepository.delete(id);
    return result.affected > 0;
  }
}
