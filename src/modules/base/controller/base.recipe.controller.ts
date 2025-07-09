import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";

import { PaginationOptionsDto } from "@app/common/dto";
import {
  CreateBaseRecipeDto,
  UpdateBaseRecipeDto,
  DetailsBaseRecipeDto,
  PaginatedDetailsBaseRecipeDto
} from "../dto";
import { BaseRecipeService } from "../service";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/recipe")
export class BaseRecipeController {
  constructor(private readonly recipeService: BaseRecipeService) {}

  @Post()
  @ApiOperation({ summary: "Create recipe", operationId: "createBaseRecipe" })
  @ApiCreatedResponse({ description: "Recipe created successfully.", type: DetailsBaseRecipeDto, status: HttpStatus.CREATED })
  create(@Body() dto: CreateBaseRecipeDto): Promise<DetailsBaseRecipeDto> {
    return this.recipeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all recipes", operationId: "findAllBaseRecipes" })
  @ApiOkResponse({ description: "List of recipes.", type: PaginatedDetailsBaseRecipeDto })
  findAll(@Query() pagination: PaginationOptionsDto): Promise<PaginatedDetailsBaseRecipeDto> {
    return this.recipeService.findAll(pagination);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get recipe by id", operationId: "findBaseRecipeById" })
  @ApiOkResponse({ description: "Recipe by id.", type: DetailsBaseRecipeDto })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseRecipeDto> {
    return this.recipeService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update recipe", operationId: "updateBaseRecipe" })
  @ApiOkResponse({ description: "Updated recipe.", type: DetailsBaseRecipeDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateBaseRecipeDto
  ): Promise<DetailsBaseRecipeDto> {
    return this.recipeService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete recipe", operationId: "removeBaseRecipe" })
  @ApiOkResponse({ description: "Recipe deleted successfully." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.recipeService.remove(id);
  }
}
