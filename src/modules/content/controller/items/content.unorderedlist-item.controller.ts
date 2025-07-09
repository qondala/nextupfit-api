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

import {
  CreateContentUnorderedlistItemDto,
  UpdateContentUnorderedlistItemDto,
  DetailsContentUnorderedlistItemDto,
  PaginatedDetailsContentUnorderedlistItemDto,
} from "../../dto";

import { ContentUnorderedlistItemService } from "../../service/items";
import { SwaggerType } from "@app/common/types";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/unorderedlist-item")
export class ContentUnorderedlistItemController {
  constructor(private readonly service: ContentUnorderedlistItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create unorderedlist item",
    operationId: "createContentUnorderedlistItem",
  })
  @ApiBody({
    type: CreateContentUnorderedlistItemDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentUnorderedlistItemDto,
  })
  async create(@Body() dto: CreateContentUnorderedlistItemDto): Promise<DetailsContentUnorderedlistItemDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Find all unorderedlist items",
    operationId: "findAllContentUnorderedlistItems",
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
    type: PaginatedDetailsContentUnorderedlistItemDto,
  })
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentUnorderedlistItemDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Find one unorderedlist item",
    operationId: "findOneContentUnorderedlistItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentUnorderedlistItemDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentUnorderedlistItemDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update unorderedlist item",
    operationId: "updateContentUnorderedlistItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentUnorderedlistItemDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentUnorderedlistItemDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentUnorderedlistItemDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete unorderedlist item",
    operationId: "deleteContentUnorderedlistItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentUnorderedlistItemDto,
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
