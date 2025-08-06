import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateContentSusbcriptionPlanItemDto,
  DetailsContentSusbcriptionPlanItemDto,
  PaginatedDetailsContentSusbcriptionPlanItemDto,
  UpdateContentSusbcriptionPlanItemDto,
} from "../../dto";

import { ContentSusbcriptionPlanItemService } from "../../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/subscription-plan-item")
export class ContentSusbcriptionPlanItemController {
  constructor(private readonly service: ContentSusbcriptionPlanItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content subscription plan item",
    operationId: "createContentSubscriptionPlanItem",
  })
  @ApiBody({
    type: CreateContentSusbcriptionPlanItemDto,
    description: "Content subscription plan item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content subscription plan item created successfully",
    type: DetailsContentSusbcriptionPlanItemDto,
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
    @Body() dto: CreateContentSusbcriptionPlanItemDto,
  ): Promise<DetailsContentSusbcriptionPlanItemDto> {
    return await this.service.create(dto);
  }

  @Get("list/:contentSubscriptionPlanId")
  @ApiOperation({
    summary: "Get all content subscription plan items with pagination",
    operationId: "findAllContentSubscriptionPlanItems",
  })
  @ApiParam({
    name: "contentSubscriptionPlanId",
    type: SwaggerType.INTEGER,
    description: "Content subscription plan ID",
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
    description:
      "List of content subscription plan items retrieved successfully",
    type: PaginatedDetailsContentSusbcriptionPlanItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentSubscriptionPlanId", ParseIntPipe)
    contentSubscriptionPlanId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentSusbcriptionPlanItemDto> {
    return await this.service.findAll(contentSubscriptionPlanId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content subscription plan item by ID",
    operationId: "findOneContentSubscriptionPlanItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content subscription plan item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content subscription plan item retrieved successfully",
    type: DetailsContentSusbcriptionPlanItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content subscription plan item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentSusbcriptionPlanItemDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content subscription plan item by ID",
    operationId: "updateContentSubscriptionPlanItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content subscription plan item ID",
  })
  @ApiBody({
    type: UpdateContentSusbcriptionPlanItemDto,
    description: "Content subscription plan item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content subscription plan item updated successfully",
    type: DetailsContentSusbcriptionPlanItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content subscription plan item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentSusbcriptionPlanItemDto,
  ): Promise<DetailsContentSusbcriptionPlanItemDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content subscription plan item by ID",
    operationId: "removeContentSubscriptionPlanItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content subscription plan item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content subscription plan item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content subscription plan item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
