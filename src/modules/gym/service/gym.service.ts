import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { CreateGymDto, UpdateGymDto } from "../dto";
import { GymEntity } from "../entity";
import { GymSpecialityEnum } from "../types";

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(GymEntity)
    private readonly gymRepository: Repository<GymEntity>,
  ) {}

  async create(createDto: CreateGymDto): Promise<GymEntity> {
    const gym = this.gymRepository.create(createDto);
    return await this.gymRepository.save(gym);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .orderBy("gym.createdAt", "DESC");

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

  async findBestRatedAndAttented(
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .orderBy("gym.ratingsAvg", "DESC")
      .orderBy("gym.followersCount", "DESC");

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

  async findOne(id: number): Promise<GymEntity> {
    return await this.gymRepository.findOne({
      where: { id },
      relations: [
        "owner",
        "proprietor",
        "managers",
        "membershipPlans",
        "specializedWorkouts",
        "specializedNutritions",
        "openDays",
        "interests",
      ],
    });
  }

  async getFlatOne(id: number): Promise<GymEntity> {
    return await this.gymRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateDto: UpdateGymDto): Promise<GymEntity> {
    await this.gymRepository.update(id, updateDto);
    return this.getFlatOne(id);
  }

  async search(
    query: string,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const { page = 1, limit = 10 } = paginationOptions;
    const skip = (page - 1) * limit;

    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.name ILIKE :query", { query: `%${query}%` })
      .orderBy("gym.createdAt", "DESC");

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findBestRatedAndAttentedGymsSpecializedInWorkouts(
    specializedWorkouts: number[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.specializedWorkouts.id IN (:...specializedWorkouts)", {
        specializedWorkouts,
      })
      .orderBy("gym.ratingsAvg", "DESC")
      .orderBy("gym.followersCount", "DESC");

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

  async findBestRatedAndAttentedGymsSpecializedInNutritions(
    specializedNutritions: number[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.specializedNutritions.id IN (:...specializedNutritions)", {
        specializedNutritions,
      })
      .orderBy("gym.ratingsAvg", "DESC")
      .orderBy("gym.followersCount", "DESC");

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

  async findBestRatedAndAttentedGymsSpecializedInNutritionsAndWorkouts(
    specializedNutritions: number[],
    specializedWorkouts: number[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.specializedNutritions.id IN (:...specializedNutritions)", {
        specializedNutritions,
      })
      .andWhere("gym.specializedWorkouts.id IN (:...specializedWorkouts)", {
        specializedWorkouts,
      })
      .orderBy("gym.ratingsAvg", "DESC")
      .orderBy("gym.followersCount", "DESC");

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

  async findBestRatedAndAttentedGymsSpecializedInNutritionsOrWorkouts(
    specializedNutritions: number[],
    specializedWorkouts: number[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.specializedNutritions.id IN (:...specializedNutritions)", {
        specializedNutritions,
      })
      .orWhere("gym.specializedWorkouts.id IN (:...specializedWorkouts)", {
        specializedWorkouts,
      })
      .orderBy("gym.ratingsAvg", "DESC")
      .orderBy("gym.followersCount", "DESC");

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

  async findBestRatedAndAttentedGymsSpecializedInNutritionsAndWorkoutsAndSpeciality(
    specializedNutritions: number[],
    specializedWorkouts: number[],
    speciality: GymSpecialityEnum,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.specializedNutritions.id IN (:...specializedNutritions)", {
        specializedNutritions,
      })
      .andWhere("gym.specializedWorkouts.id IN (:...specializedWorkouts)", {
        specializedWorkouts,
      })
      .andWhere("gym.speciality = :speciality", { speciality })
      .orderBy("gym.ratingsAvg", "DESC")
      .orderBy("gym.followersCount", "DESC");

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

  async findBestRatedAndAttentedGymsSpecializedInNutritionsOrWorkoutsOrSpeciality(
    specializedNutritions: number[],
    specializedWorkouts: number[],
    speciality: GymSpecialityEnum,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.specializedNutritions.id IN (:...specializedNutritions)", {
        specializedNutritions,
      })
      .orWhere("gym.specializedWorkouts.id IN (:...specializedWorkouts)", {
        specializedWorkouts,
      })
      .orWhere("gym.speciality = :speciality", { speciality })
      .orderBy("gym.ratingsAvg", "DESC")
      .orderBy("gym.followersCount", "DESC");

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

  async findRandomGymsInSpeciality(
    speciality: GymSpecialityEnum,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.speciality = :speciality", { speciality })
      .orderBy("RANDOM()")
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const [items, totalItems] = await queryBuilder.getManyAndCount();

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

  async findRandomGymsInSpecialities(
    specialities: GymSpecialityEnum[],
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.speciality IN (:...specialities)", { specialities })
      .orderBy("RANDOM()")
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const [items, totalItems] = await queryBuilder.getManyAndCount();

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

  async findGymsOwnedByManager(
    managerId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<GymEntity>> {
    const queryBuilder = this.gymRepository
      .createQueryBuilder("gym")
      .where("gym.createdByManagerId = :managerId", { managerId })
      .orWhere("gym.proprietorManagerId = :managerId", { managerId })
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const [items, totalItems] = await queryBuilder.getManyAndCount();

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

  async remove(id: number): Promise<void> {
    await this.gymRepository.delete(id);
  }
}
