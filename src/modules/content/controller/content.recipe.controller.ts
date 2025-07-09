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
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ContentRecipeService } from "../service";
import {
  CreateContentRecipeDto,
  UpdateContentRecipeDto,
  DetailsContentRecipeDto,
  PaginatedDetailsContentRecipeDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/recipes")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentRecipeController {
  constructor(private readonly service: ContentRecipeService) {}

  @Post()
  @ApiOperation({
    summary: "Create recipe content",
    operationId: "createContentRecipe"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentRecipeDto
  })
  create(@Body() dto: CreateContentRecipeDto): Promise<DetailsContentRecipeDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get recipe contents",
    operationId: "findAllContentRecipes"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentRecipeDto
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentRecipeDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get recipe content by id",
    operationId: "findOneContentRecipe"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentRecipeDto
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentRecipeDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update recipe content",
    operationId: "updateContentRecipe"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentRecipeDto
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentRecipeDto,
  ): Promise<DetailsContentRecipeDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete recipe content",
    operationId: "removeContentRecipe"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
