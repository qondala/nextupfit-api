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
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

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
    summary: "Create a new content recipe",
    operationId: "createContentRecipe",
  })
  @ApiBody({
    type: CreateContentRecipeDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content recipe created successfully",
    type: DetailsContentRecipeDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async create(
    @Body() dto: CreateContentRecipeDto,
  ): Promise<DetailsContentRecipeDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content recipes",
    operationId: "listContentRecipes",
  })
  @ApiParam({
    name: "contentId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Content ID",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number for pagination",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of content recipes retrieved successfully",
    type: PaginatedDetailsContentRecipeDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentRecipeDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content recipe details by ID",
    operationId: "getContentRecipeDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content recipe ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content recipe details retrieved successfully",
    type: DetailsContentRecipeDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content recipe not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentRecipeDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content recipe by ID",
    operationId: "updateContentRecipe",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content recipe ID",
  })
  @ApiBody({
    type: UpdateContentRecipeDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content recipe updated successfully",
    type: DetailsContentRecipeDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content recipe not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentRecipeDto,
  ): Promise<DetailsContentRecipeDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content recipe by ID",
    operationId: "deleteContentRecipe",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content recipe ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content recipe deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content recipe not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
