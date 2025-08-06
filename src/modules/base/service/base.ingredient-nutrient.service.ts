import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto } from "@app/common/dto";
import { BaseIngredientNutrientEntity } from "../entity";
import {
  CreateBaseIngredientNutrientDto,
  UpdateBaseIngredientNutrientDto,
  DetailsBaseIngredientNutrientDto,
} from "../dto";

@Injectable()
export class BaseIngredientNutrientService {
  constructor(
    @InjectRepository(BaseIngredientNutrientEntity)
    private readonly repository: Repository<BaseIngredientNutrientEntity>,
  ) {}

  async create(
    createDto: CreateBaseIngredientNutrientDto,
  ): Promise<DetailsBaseIngredientNutrientDto> {
    const ingredientNutrient = this.repository.create(createDto);
    const savedIngredientNutrient =
      await this.repository.save(ingredientNutrient);
    return savedIngredientNutrient;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<BaseIngredientNutrientEntity>> {
    const [items, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
      relations: ["ingredient", "nutrient"],
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

  async findOne(id: number): Promise<DetailsBaseIngredientNutrientDto> {
    const ingredientNutrient = await this.repository.findOne({
      where: { id },
      relations: ["ingredient", "nutrient"],
    });

    if (!ingredientNutrient) {
      throw new NotFoundException(
        `Ingredient nutrient with ID ${id} not found`,
      );
    }

    return ingredientNutrient;
  }

  async findByIngredientId(
    ingredientId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<BaseIngredientNutrientEntity>> {
    const [items, totalItems] = await this.repository.findAndCount({
      where: { ingredientId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
      relations: ["ingredient", "nutrient"],
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

  async findByNutrientId(
    nutrientId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<BaseIngredientNutrientEntity>> {
    const [items, totalItems] = await this.repository.findAndCount({
      where: { nutrientId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
      relations: ["ingredient", "nutrient"],
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

  async findByCreatedByUserId(
    createdByUserId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<BaseIngredientNutrientEntity>> {
    const [items, totalItems] = await this.repository.findAndCount({
      where: { createdByUserId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
      relations: ["ingredient", "nutrient"],
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
    updateDto: UpdateBaseIngredientNutrientDto,
  ): Promise<DetailsBaseIngredientNutrientDto> {
    const ingredientNutrient = await this.repository.findOne({
      where: { id },
      relations: ["ingredient", "nutrient"],
    });

    if (!ingredientNutrient) {
      throw new NotFoundException(
        `Ingredient nutrient with ID ${id} not found`,
      );
    }

    Object.assign(ingredientNutrient, updateDto);
    const updatedIngredientNutrient =
      await this.repository.save(ingredientNutrient);
    return updatedIngredientNutrient;
  }

  async remove(id: number): Promise<void> {
    const ingredientNutrient = await this.repository.findOne({
      where: { id },
    });

    if (!ingredientNutrient) {
      throw new NotFoundException(
        `Ingredient nutrient with ID ${id} not found`,
      );
    }

    await this.repository.remove(ingredientNutrient);
  }
}
