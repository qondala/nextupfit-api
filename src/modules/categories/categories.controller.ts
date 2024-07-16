import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Request } from "express";
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { Category } from "../../entities/category.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Categories")
@ApiBearerAuth()
@Controller("categories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(UserRole.ADMIN) // On suppose que seul l'administrateur peut créer des catégories
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({
    description: "Category created successfully",
    type: Category,
  })
  @ApiInternalServerErrorResponse({ description: "Failed to create category" })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({ description: "List of all categories", type: [Category] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch categories" })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the category", type: "number" })
  @ApiOkResponse({ description: "Category found successfully", type: Category })
  @ApiNotFoundResponse({ description: "Category not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch category" })
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.ADMIN) // On suppose que seul l'administrateur peut mettre à jour des catégories
  @ApiParam({ name: "id", description: "ID of the category", type: "number" })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({
    description: "Category updated successfully",
    type: Category,
  })
  @ApiNotFoundResponse({ description: "Category not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update category" })
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN) // On suppose que seul l'administrateur peut supprimer des catégories
  @ApiParam({ name: "id", description: "ID of the category", type: "number" })
  @ApiOkResponse({ description: "Category deleted successfully" })
  @ApiNotFoundResponse({ description: "Category not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete category" })
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of categories matching the search query",
    type: [Category],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search categories",
  })
  searchCategories(@Query("query") query: string) {
    return this.categoriesService.searchCategories(query);
  }
}
