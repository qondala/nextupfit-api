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
  CreateContentAccordionItemDto,
  UpdateContentAccordionItemDto,
  DetailsContentAccordionItemDto,
  PaginatedDetailsContentAccordionItemDto,
} from "../../dto";
import { ContentAccordionItemService } from "../../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/accordion/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentAccordionItemController {
  constructor(
    private readonly accordionItemService: ContentAccordionItemService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content accordion item",
    operationId: "createContentAccordionItem",
  })
  @ApiBody({
    type: CreateContentAccordionItemDto,
    description: "Content accordion item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content accordion item created successfully",
    type: DetailsContentAccordionItemDto,
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
    @Body() dto: CreateContentAccordionItemDto,
  ): Promise<DetailsContentAccordionItemDto> {
    return await this.accordionItemService.create(dto);
  }

  @Get("list/:accordionId")
  @ApiOperation({
    summary: "Get all content accordion items with pagination",
    operationId: "findAllContentAccordionItems",
  })
  @ApiParam({
    name: "accordionId",
    type: SwaggerType.INTEGER,
    description: "Content accordion ID",
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
    description: "List of content accordion items retrieved successfully",
    type: PaginatedDetailsContentAccordionItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("accordionId", ParseIntPipe) accordionId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentAccordionItemDto> {
    return await this.accordionItemService.findAll(accordionId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content accordion item by ID",
    operationId: "findOneContentAccordionItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content accordion item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content accordion item retrieved successfully",
    type: DetailsContentAccordionItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content accordion item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentAccordionItemDto> {
    return await this.accordionItemService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content accordion item by ID",
    operationId: "updateContentAccordionItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content accordion item ID",
  })
  @ApiBody({
    type: UpdateContentAccordionItemDto,
    description: "Content accordion item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content accordion item updated successfully",
    type: DetailsContentAccordionItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content accordion item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentAccordionItemDto,
  ): Promise<DetailsContentAccordionItemDto> {
    return await this.accordionItemService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content accordion item by ID",
    operationId: "removeContentAccordionItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content accordion item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content accordion item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content accordion item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.accordionItemService.remove(id);
  }
}
