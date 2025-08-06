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
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateContentFaqItemDto,
  UpdateContentFaqItemDto,
  DetailsContentFaqItemDto,
  PaginatedDetailsContentFaqItemDto,
} from "../../dto";

import { ContentFaqItemService } from "../../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/faq/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentFaqItemController {
  constructor(private readonly faqItemService: ContentFaqItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content FAQ item",
    operationId: "createContentFaqItem",
  })
  @ApiBody({
    type: CreateContentFaqItemDto,
    description: "Content FAQ item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content FAQ item created successfully",
    type: DetailsContentFaqItemDto,
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
    @Body() dto: CreateContentFaqItemDto,
  ): Promise<DetailsContentFaqItemDto> {
    return await this.faqItemService.create(dto);
  }

  @Get("list/:contentFaqId")
  @ApiOperation({
    summary: "Get all content FAQ items with pagination",
    operationId: "findAllContentFaqItems",
  })
  @ApiParam({
    name: "contentFaqId",
    type: SwaggerType.INTEGER,
    description: "Content FAQ ID",
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
    description: "List of content FAQ items retrieved successfully",
    type: PaginatedDetailsContentFaqItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentFaqId", ParseIntPipe) contentFaqId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentFaqItemDto> {
    return await this.faqItemService.findAll(contentFaqId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content FAQ item by ID",
    operationId: "findOneContentFaqItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content FAQ item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content FAQ item retrieved successfully",
    type: DetailsContentFaqItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content FAQ item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentFaqItemDto> {
    return await this.faqItemService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content FAQ item by ID",
    operationId: "updateContentFaqItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content FAQ item ID",
  })
  @ApiBody({
    type: UpdateContentFaqItemDto,
    description: "Content FAQ item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content FAQ item updated successfully",
    type: DetailsContentFaqItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content FAQ item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentFaqItemDto,
  ): Promise<DetailsContentFaqItemDto> {
    return await this.faqItemService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content FAQ item by ID",
    operationId: "removeContentFaqItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content FAQ item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content FAQ item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content FAQ item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.faqItemService.remove(id);
  }
}
