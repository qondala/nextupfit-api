import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { BaseWorkoutMuscleEntity } from "../entity";
import { CreateBaseWorkoutMuscleDto, UpdateBaseWorkoutMuscleDto } from "../dto";

@Injectable()
export class BaseWorkoutMuscleService {
  constructor(
    @InjectRepository(BaseWorkoutMuscleEntity)
    private readonly baseWorkoutMuscleRepository: Repository<BaseWorkoutMuscleEntity>,
  ) {}

  async create(
    createBaseWorkoutMuscleDto: CreateBaseWorkoutMuscleDto,
  ): Promise<BaseWorkoutMuscleEntity> {
    const newWorkoutMuscle = this.baseWorkoutMuscleRepository.create(
      createBaseWorkoutMuscleDto,
    );
    return this.baseWorkoutMuscleRepository.save(newWorkoutMuscle);
  }

  async findAll(
    options: PaginationOptionsDto,
    workoutId?: number,
    muscleId?: number,
  ): Promise<PaginatedResponseDto<BaseWorkoutMuscleEntity>> {
    const queryBuilder =
      this.baseWorkoutMuscleRepository.createQueryBuilder("workoutMuscle");

    if (workoutId) {
      queryBuilder.where("workoutMuscle.workoutId = :workoutId", { workoutId });
    }

    if (muscleId) {
      if (workoutId) {
        queryBuilder.andWhere("workoutMuscle.muscleId = :muscleId", { muscleId });
      } else {
        queryBuilder.where("workoutMuscle.muscleId = :muscleId", { muscleId });
      }
    }

    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .orderBy("workoutMuscle.id", "DESC");

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

  async findOne(id: number): Promise<BaseWorkoutMuscleEntity | null> {
    return this.baseWorkoutMuscleRepository.findOne({
      where: { id },
      relations: ["workout", "muscle"],
    });
  }

  async update(
    id: number,
    updateBaseWorkoutMuscleDto: UpdateBaseWorkoutMuscleDto,
  ): Promise<BaseWorkoutMuscleEntity | null> {
    const result = await this.baseWorkoutMuscleRepository.update(
      id,
      updateBaseWorkoutMuscleDto,
    );

    if (result.affected === 0) {
      return null;
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.baseWorkoutMuscleRepository.delete(id);
    return result.affected > 0;
  }
}
