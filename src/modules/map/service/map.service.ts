import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  LocationRadiusDto,
  PaginatedResponseDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import { GymEntity, GymManagerEntity } from "@app/module/gym/entity";
import { UserEntity } from "@app/module/user/entity";

import { CreateMapDto, UpdateMapDto } from "../dto";
import { MapEntity } from "../entity";

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(MapEntity)
    private readonly mapRepository: Repository<MapEntity>,
    @InjectRepository(GymEntity)
    private readonly gymRepository: Repository<GymEntity>,
    @InjectRepository(GymManagerEntity)
    private readonly gymManagerRepository: Repository<GymManagerEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createDto: CreateMapDto): Promise<MapEntity> {
    const map = this.mapRepository.create(createDto);
    return await this.mapRepository.save(map);
  }

  async findGymsWithinRadius(
    locationRadiusDto: LocationRadiusDto,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<MapEntity>> {
    const offset = (paginationOptions.page - 1) * paginationOptions.limit;

    // 1. Paginated data query
    const items: MapEntity[] = await this.mapRepository.query(
      `
      SELECT *, ST_Distance(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography) AS distance
      FROM map
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        $3
      )
      AND gymId IS NOT NULL
      AND userId IS NULL
      AND managerId IS NULL
      ORDER BY distance ASC
      LIMIT $4 OFFSET $5
      `,
      [
        locationRadiusDto.longitude,
        locationRadiusDto.latitude,
        locationRadiusDto.radius,
        paginationOptions.limit,
        offset,
      ],
    );

    for (const item of items) {
      item.gym = await this.gymRepository.findOne({
        where: { id: item.gymId },
      });
    }

    // 2. Total count query
    const countResult = await this.mapRepository.query(
      `
      SELECT COUNT(*) as total
      FROM map
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        $3
      )
      AND gymId IS NOT NULL
      AND userId IS NULL
      AND managerId IS NULL
      `,
      [
        locationRadiusDto.longitude,
        locationRadiusDto.latitude,
        locationRadiusDto.radius,
      ],
    );

    const totalItems = parseInt(countResult[0].total, 10);
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

  async findManagersWithinRadius(
    locationRadiusDto: LocationRadiusDto,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<MapEntity>> {
    const offset = (paginationOptions.page - 1) * paginationOptions.limit;

    // 1. Paginated data query
    const items: MapEntity[] = await this.mapRepository.query(
      `
      SELECT *, ST_Distance(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography) AS distance
      FROM map
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        $3
      )
      AND gymId IS NULL
      AND managerId IS NOT NULL
      AND userId IS NULL
      ORDER BY distance ASC
      LIMIT $4 OFFSET $5
      `,
      [
        locationRadiusDto.longitude,
        locationRadiusDto.latitude,
        locationRadiusDto.radius,
        paginationOptions.limit,
        offset,
      ],
    );

    for (const item of items) {
      item.manager = await this.gymManagerRepository.findOne({
        where: { id: item.managerId },
      });
    }

    // 2. Total count query
    const countResult = await this.mapRepository.query(
      `
      SELECT COUNT(*) as total
      FROM map
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        $3
      )
      AND gymId IS NULL
      AND managerId IS NOT NULL
      AND userId IS NULL
      `,
      [
        locationRadiusDto.longitude,
        locationRadiusDto.latitude,
        locationRadiusDto.radius,
      ],
    );

    const totalItems = parseInt(countResult[0].total, 10);
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

  async findUsersWithinRadius(
    locationRadiusDto: LocationRadiusDto,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<MapEntity>> {
    const offset = (paginationOptions.page - 1) * paginationOptions.limit;

    // 1. Paginated data query
    const items: MapEntity[] = await this.mapRepository.query(
      `
      SELECT *, ST_Distance(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography) AS distance
      FROM map
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        $3
      )
      AND gymId IS NULL
      AND userId IS NOT NULL
      AND managerId IS NULL
      ORDER BY distance ASC
      LIMIT $4 OFFSET $5
      `,
      [
        locationRadiusDto.longitude,
        locationRadiusDto.latitude,
        locationRadiusDto.radius,
        paginationOptions.limit,
        offset,
      ],
    );

    for (const item of items) {
      item.user = await this.userRepository.findOne({
        where: { id: item.userId },
      });
    }

    // 2. Total count query
    const countResult = await this.mapRepository.query(
      `
      SELECT COUNT(*) as total
      FROM map
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        $3
      )
      AND gymId IS NULL
      AND userId IS NOT NULL
      AND managerId IS NULL
      `,
      [
        locationRadiusDto.longitude,
        locationRadiusDto.latitude,
        locationRadiusDto.radius,
      ],
    );

    const totalItems = parseInt(countResult[0].total, 10);
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

  async findByGym(
    gymId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<MapEntity>> {
    const queryBuilder = this.mapRepository
      .createQueryBuilder("map")
      .where("map.gymId = :gymId", { gymId })
      .orderBy("map.createdAt", "DESC");

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

  async findByManager(
    targetManagerId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<MapEntity>> {
    const queryBuilder = this.mapRepository
      .createQueryBuilder("map")
      .where("map.managerId = :targetManagerId", { targetManagerId })
      .orderBy("map.createdAt", "DESC");

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

  async findByUser(
    targetUserId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<MapEntity>> {
    const queryBuilder = this.mapRepository
      .createQueryBuilder("map")
      .where("map.userId = :targetUserId", { targetUserId })
      .orderBy("map.createdAt", "DESC");

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

  async findOne(id: number): Promise<MapEntity> {
    return await this.mapRepository.findOne({
      where: { id },
      relations: ["user", "gym"],
    });
  }

  async update(id: number, updateDto: UpdateMapDto): Promise<MapEntity> {
    await this.mapRepository.update({ id }, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.mapRepository.delete({ id });
  }
}
