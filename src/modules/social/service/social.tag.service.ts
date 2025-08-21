import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateSocialTagDto,
  UpdateSocialTagDto,
} from "../dto";
import { SocialTagEntity } from "../entity";
import { SocialTagTargetEnum } from "../types";

@Injectable()
export class SocialTagService {
  constructor(
    @InjectRepository(SocialTagEntity)
    private readonly tagRepository: Repository<SocialTagEntity>,
  ) {}

  async create(
    createDto: CreateSocialTagDto,
  ): Promise<SocialTagEntity> {
    const tag = this.tagRepository.create({
      ...createDto,
      createdAt: new Date(),
    });
    return await this.tagRepository.save(tag);
  }

  async findAll(
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialTagEntity>> {
    const queryBuilder = this.tagRepository
      .createQueryBuilder("tag")
      .orderBy("tag.createdAt", "DESC");

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

  async findByTargetAndTargetId(
    target: SocialTagTargetEnum,
    targetId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialTagEntity>> {
    const queryBuilder = this.tagRepository
      .createQueryBuilder("tag")
      .where("tag.target = :target", { target })
      .andWhere("tag.targetId = :targetId", { targetId })
      .orderBy("tag.createdAt", "DESC");

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

  async findByAuthorUserId(
    authorUserId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialTagEntity>> {
    const queryBuilder = this.tagRepository
      .createQueryBuilder("tag")
      .where("tag.authorUserId = :authorUserId", { authorUserId })
      .orderBy("tag.createdAt", "DESC");

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

  async findOne(id: number): Promise<SocialTagEntity> {
    return (await this.tagRepository.findOne({
      where: { id },
    })) as SocialTagEntity;
  }

  async update(
    id: number,
    updateDto: UpdateSocialTagDto,
  ): Promise<SocialTagEntity> {
    await this.tagRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }

  async searchByTag(
    searchTerm: string,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<SocialTagEntity>> {
    const queryBuilder = this.tagRepository
      .createQueryBuilder("tag")
      .where("tag.tag ILIKE :searchTerm", { searchTerm: `%${searchTerm}%` })
      .orderBy("tag.createdAt", "DESC");

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
}
