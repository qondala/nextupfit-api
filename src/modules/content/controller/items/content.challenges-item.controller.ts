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
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ContentChallengesItemService } from "../../service";
import {
  CreateContentChallengesItemDto,
  UpdateContentChallengesItemDto,
  DetailsContentChallengesItemDto,
  PaginatedDetailsContentChallengesItemDto,
} from "../../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/challenges/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentChallengesItemController {
  constructor(private readonly service: ContentChallengesItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content challenges item",
    operationId: "createContentChallengesItem",
  })
  @ApiBody({
    type: CreateContentChallengesItemDto,
    description: "Content challenges item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content challenges item created successfully",
    type: DetailsContentChallengesItemDto,
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
    @Body() dto: CreateContentChallengesItemDto,
  ): Promise<DetailsContentChallengesItemDto> {
    return await this.service.create(dto);
  }

  @Get("list/:challengesId")
  @ApiOperation({
    summary: "Get all content challenges items with pagination",
    operationId: "findAllContentChallengesItems",
  })
  @ApiParam({
    name: "challengesId",
    type: SwaggerType.INTEGER,
    description: "Content challenges ID",
    required: true,
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number for pagination",
    required: false,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of content challenges items retrieved successfully",
    type: PaginatedDetailsContentChallengesItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("challengesId", ParseIntPipe) challengesId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentChallengesItemDto> {
    return await this.service.findAll(challengesId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content challenges item by ID",
    operationId: "findOneContentChallengesItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content challenges item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content challenges item retrieved successfully",
    type: DetailsContentChallengesItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content challenges item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentChallengesItemDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content challenges item by ID",
    operationId: "updateContentChallengesItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content challenges item ID",
  })
  @ApiBody({
    type: UpdateContentChallengesItemDto,
    description: "Content challenges item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content challenges item updated successfully",
    type: DetailsContentChallengesItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content challenges item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentChallengesItemDto,
  ): Promise<DetailsContentChallengesItemDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content challenges item by ID",
    operationId: "removeContentChallengesItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content challenges item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content challenges item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content challenges item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
