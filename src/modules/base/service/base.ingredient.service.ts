import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto } from "@app/common/dto";
import { BaseIngredientEntity } from "../entity";
import {
  CreateBaseIngredientDto,
  UpdateBaseIngredientDto,
  DetailsBaseIngredientDto,
} from "../dto";

@Injectable()
export class BaseIngredientService {
  constructor(
    @InjectRepository(BaseIngredientEntity)
    private readonly repository: Repository<BaseIngredientEntity>,
  ) {}

  async create(
    createDto: CreateBaseIngredientDto,
  ): Promise<DetailsBaseIngredientDto> {
    const ingredient = this.repository.create(createDto);
    const savedIngredient = await this.repository.save(ingredient);
    return savedIngredient;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<BaseIngredientEntity>> {
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

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

  async findOne(id: number): Promise<BaseIngredientEntity> {
    const ingredient = await this.repository.findOne({
      where: { id },
      relations: ["nutrients"],
    });


    return ingredient;
  }

  async findByType(
    type: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<BaseIngredientEntity>> {
    const [items, totalItems] = await this.repository.findAndCount({
      where: { type: type as any },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

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

  async findByBrand(
    brand: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<BaseIngredientEntity>> {
    const [items, totalItems] = await this.repository.findAndCount({
      where: { brand },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

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

  async searchByName(
    name: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<BaseIngredientEntity>> {
    const [items, totalItems] = await this.repository.findAndCount({
      where: { name: `%${name}%` as any },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

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

  async update(
    id: number,
    updateDto: UpdateBaseIngredientDto,
  ): Promise<DetailsBaseIngredientDto> {
    const ingredient = await this.repository.findOne({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    Object.assign(ingredient, updateDto);
    const updatedIngredient = await this.repository.save(ingredient);
    return updatedIngredient;
  }

  async remove(id: number): Promise<void> {
    const ingredient = await this.repository.findOne({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    await this.repository.remove(ingredient);
  }
}
