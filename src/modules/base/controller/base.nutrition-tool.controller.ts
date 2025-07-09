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
  CreateBaseNutritionToolDto,
  UpdateBaseNutritionToolDto,
  DetailsBaseNutritionToolDto,
  PaginatedDetailsBaseNutritionToolDto
} from "../dto";
import { BaseNutritionToolService } from "../service";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/nutrition-tool")
export class BaseNutritionToolController {
  constructor(private readonly nutritionToolService: BaseNutritionToolService) {}

  @Post()
  @ApiOperation({
    summary: "Create a nutrition tool",
    operationId: "createBaseNutritionTool"
  })
  @ApiCreatedResponse({
    description: "Nutrition tool created successfully.",
    type: DetailsBaseNutritionToolDto,
    status: HttpStatus.CREATED
  })
  create(
    @Body() createDto: CreateBaseNutritionToolDto
  ): Promise<DetailsBaseNutritionToolDto> {
    return this.nutritionToolService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all nutrition tools",
    operationId: "findAllBaseNutritionTools"
  })
  @ApiOkResponse({
    description: "List of nutrition tools.",
    type: PaginatedDetailsBaseNutritionToolDto
  })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsBaseNutritionToolDto> {
    return this.nutritionToolService.findAll(paginationOptions);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get nutrition tool by id",
    operationId: "findBaseNutritionToolById"
  })
  @ApiOkResponse({
    description: "Nutrition tool by id.",
    type: DetailsBaseNutritionToolDto
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsBaseNutritionToolDto> {
    return this.nutritionToolService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update nutrition tool",
    operationId: "updateBaseNutritionTool"
  })
  @ApiOkResponse({
    description: "Updated nutrition tool.",
    type: DetailsBaseNutritionToolDto
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateBaseNutritionToolDto
  ): Promise<DetailsBaseNutritionToolDto> {
    return this.nutritionToolService.update(id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete nutrition tool",
    operationId: "removeBaseNutritionTool"
  })
  @ApiOkResponse({ description: "Nutrition tool deleted successfully." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.nutritionToolService.remove(id);
  }
}
