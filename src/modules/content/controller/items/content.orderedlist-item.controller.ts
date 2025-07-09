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

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import {
  CreateContentOrderedlistItemDto,
  UpdateContentOrderedlistItemDto,
  DetailsContentOrderedlistItemDto,
  PaginatedDetailsContentOrderedlistItemDto,
} from "../../dto";

import { ContentOrderedlistItemService } from "../../service/items";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/orderedlist-item")
export class ContentOrderedlistItemController {
  constructor(private readonly service: ContentOrderedlistItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create ordered list item",
    operationId: "createContentOrderedlistItem",
  })
  @ApiBody({
    type: CreateContentOrderedlistItemDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentOrderedlistItemDto,
  })
  async create(@Body() dto: CreateContentOrderedlistItemDto): Promise<DetailsContentOrderedlistItemDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Find all ordered list items",
    operationId: "findAllContentOrderedlistItems",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentOrderedlistItemDto,
  })
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentOrderedlistItemDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Find one ordered list item",
    operationId: "findOneContentOrderedlistItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentOrderedlistItemDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentOrderedlistItemDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update ordered list item",
    operationId: "updateContentOrderedlistItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentOrderedlistItemDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentOrderedlistItemDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentOrderedlistItemDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete ordered list item",
    operationId: "deleteContentOrderedlistItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentOrderedlistItemDto,
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
