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
  CreateBaseRecipeItemDto,
  UpdateBaseRecipeItemDto,
  DetailsBaseRecipeItemDto,
  PaginatedDetailsBaseRecipeItemDto
} from "../dto";
import { BaseRecipeItemService } from "../service";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/recipe-item")
export class BaseRecipeItemController {
  constructor(private readonly recipeItemService: BaseRecipeItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create recipe item",
    operationId: "createBaseRecipeItem"
  })
  @ApiCreatedResponse({
    description: "Recipe item created successfully.",
    type: DetailsBaseRecipeItemDto,
    status: HttpStatus.CREATED
  })
  create(@Body() createDto: CreateBaseRecipeItemDto): Promise<DetailsBaseRecipeItemDto> {
    return this.recipeItemService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all recipe items",
    operationId: "findAllBaseRecipeItems"
  })
  @ApiOkResponse({
    description: "List of recipe items.",
    type: PaginatedDetailsBaseRecipeItemDto
  })
  findAll(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsBaseRecipeItemDto> {
    return this.recipeItemService.findAll(paginationOptions);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get recipe item by id",
    operationId: "findBaseRecipeItemById"
  })
  @ApiOkResponse({
    description: "Recipe item by id.",
    type: DetailsBaseRecipeItemDto
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseRecipeItemDto> {
    return this.recipeItemService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update recipe item",
    operationId: "updateBaseRecipeItem"
  })
  @ApiOkResponse({
    description: "Updated recipe item.",
    type: DetailsBaseRecipeItemDto
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateBaseRecipeItemDto
  ): Promise<DetailsBaseRecipeItemDto> {
    return this.recipeItemService.update(id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete recipe item",
    operationId: "removeBaseRecipeItem"
  })
  @ApiOkResponse({
    description: "Recipe item deleted successfully."
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.recipeItemService.remove(id);
  }
}
