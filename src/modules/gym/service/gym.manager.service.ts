import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { CreateGymManagerDto, UpdateGymManagerDto } from "../dto";
import { GymManagerEntity, GymManagerOverviewEntity } from "../entity";
import { GymManagerSpecialityEnum } from "../types";
import { UserEntity } from "@app/module/user/entity";

@Injectable()
export class GymManagerService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(GymManagerEntity)
    private readonly gymManagerRepository: Repository<GymManagerEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createDto: CreateGymManagerDto): Promise<GymManagerEntity> {
    return await this.dataSource.transaction(async (entityManager) => {
      // Create gym manager overview
      const gymManagerOverviewEntity = entityManager.create(
        GymManagerOverviewEntity,
        {
          managerUserId: createDto.managerUserId,
          createdAt: new Date(),
        },
      );
      const overview = await entityManager.save(gymManagerOverviewEntity);

      // Create gym manager
      const gymManagerEntity = entityManager.create(GymManagerEntity, {
        ...createDto,
        managerOverviewId: overview.id,
      });
      const gymManager = await entityManager.save(gymManagerEntity);

      // Update user
      await this.userRepository.update(createDto.managerUserId, {
        managerAccountId: gymManager.id,
      });

      return gymManager;
    });
  }

  async findByUser(
    userId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository
      .createQueryBuilder("manager")
      .where("manager.managerUserId = :userId", { userId })
      .orderBy("manager.createdAt", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findBestRatedAndAttendedGymManagers(
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository
      .createQueryBuilder("manager")
      .orderBy("manager.ratingsAvg", "DESC")
      .orderBy("manager.followersCount", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findGymManagersWithBestRatedAndAttendedOverviewSpecializations(
    specialities: GymManagerSpecialityEnum[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository
      .createQueryBuilder("manager")
      .where("manager.speciality IN (:...specialities)", { specialities })
      .orderBy("manager.ratingsAvg", "DESC")
      .orderBy("manager.followersCount", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findGymManagersWithBestRatedAndAttendedOverviewSpecializedInWorkoutsOrNutritions(
    specializedNutritions: number[],
    specializedWorkouts: number[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository
      .createQueryBuilder("manager")
      .leftJoin("manager.gym", "gym")
      .leftJoin("gym.specializedNutritions", "nutrition")
      .leftJoin("gym.specializedWorkouts", "workout")
      .where("nutrition.id IN (:...specializedNutritions)", {
        specializedNutritions,
      })
      .orWhere("workout.id IN (:...specializedWorkouts)", {
        specializedWorkouts,
      })
      .orderBy("manager.ratingsAvg", "DESC")
      .orderBy("manager.followersCount", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findRandomGymManagersWithSpecialities(
    specialities: GymManagerSpecialityEnum[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository
      .createQueryBuilder("manager")
      .where("manager.speciality IN (:...specialities)", { specialities })
      .orderBy("RANDOM()");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findBestRatedAndAttendedGymManagersSpecializedInWorkoutsOrNutritions(
    specializedNutritions: number[],
    specializedWorkouts: number[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository
      .createQueryBuilder("manager")
      .leftJoin("manager.gym", "gym")
      .leftJoin("gym.specializedNutritions", "nutrition")
      .leftJoin("gym.specializedWorkouts", "workout")
      .where("nutrition.id IN (:...specializedNutritions)", {
        specializedNutritions,
      })
      .orWhere("workout.id IN (:...specializedWorkouts)", {
        specializedWorkouts,
      })
      .orderBy("manager.ratingsAvg", "DESC")
      .orderBy("manager.followersCount", "DESC");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findRandomGymManagersSpecializedInWorkoutsOrNutritions(
    specializedNutritions: number[],
    specializedWorkouts: number[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const queryBuilder = this.gymManagerRepository
      .createQueryBuilder("manager")
      .leftJoin("manager.gym", "gym")
      .leftJoin("gym.specializedNutritions", "nutrition")
      .leftJoin("gym.specializedWorkouts", "workout")
      .where("nutrition.id IN (:...specializedNutritions)", {
        specializedNutritions,
      })
      .orWhere("workout.id IN (:...specializedWorkouts)", {
        specializedWorkouts,
      })
      .orderBy("RANDOM()");

    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(paginationOptions.limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / paginationOptions.limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: paginationOptions.limit,
        totalPages,
        currentPage: paginationOptions.page,
      },
    };
  }

  async findOne(id: number): Promise<GymManagerEntity> {
    return await this.gymManagerRepository.findOne({
      where: { id },
      relations: [
        "user",
        "gym",
        "overview",
        "qualifications",
        "specializedWorkouts",
        "specializedNutritions",
        "interests",
      ],
    });
  }

  async getFlatOne(id: number): Promise<GymManagerEntity> {
    return await this.gymManagerRepository.findOne({
      where: { id },
    });
  }

  async getManagerWithOverview(id: number): Promise<GymManagerEntity> {
    return await this.gymManagerRepository.findOne({
      where: { id },
      relations: ["overview"],
    });
  }

  async getManagerWithUserAndOverview(id: number): Promise<GymManagerEntity> {
    return await this.gymManagerRepository.findOne({
      where: { id },
      relations: ["user", "overview"],
    });
  }

  async findManagerWithUserId(userId: number): Promise<GymManagerEntity> {
    return await this.gymManagerRepository.findOne({
      where: { managerUserId: userId },
      relations: [
        "user",
        "gym",
        "overview",
        "qualifications",
        "specializedWorkouts",
        "specializedNutritions",
        "interests",
      ],
    });
  }

  async update(
    id: number,
    updateDto: UpdateGymManagerDto,
  ): Promise<GymManagerEntity> {
    await this.gymManagerRepository.update({ id }, updateDto);
    return this.getFlatOne(id);
  }

  async search(
    query: string,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymManagerEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [users, total] = await this.gymManagerRepository
      .createQueryBuilder("manager")
      .where("manager.name ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("manager.ratingsAvg", "DESC")
      .orderBy("manager.followersCount", "DESC")
      .getManyAndCount();

    return {
      items: users,
      meta: {
        totalItems: total,
        itemCount: users.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}
