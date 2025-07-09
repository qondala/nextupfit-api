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
  CreateContentTipsItemDto,
  UpdateContentTipsItemDto,
  DetailsContentTipsItemDto,
  PaginatedDetailsContentTipsItemDto,
} from "../../dto";

import { ContentTipsItemService } from "../../service/items";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/tips-item")
export class ContentTipsItemController {
  constructor(private readonly service: ContentTipsItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create tips item",
    operationId: "createContentTipsItem",
  })
  @ApiBody({
    type: CreateContentTipsItemDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentTipsItemDto,
  })
  async create(@Body() dto: CreateContentTipsItemDto): Promise<DetailsContentTipsItemDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Find all tips items",
    operationId: "findAllContentTipsItems",
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
    type: PaginatedDetailsContentTipsItemDto,
  })
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentTipsItemDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Find one tips item",
    operationId: "findOneContentTipsItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentTipsItemDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentTipsItemDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update tips item",
    operationId: "updateContentTipsItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentTipsItemDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentTipsItemDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentTipsItemDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete tips item",
    operationId: "deleteContentTipsItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentTipsItemDto,
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
