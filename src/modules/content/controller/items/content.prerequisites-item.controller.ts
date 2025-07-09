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
  CreateContentPrerequisitesItemDto,
  UpdateContentPrerequisitesItemDto,
  DetailsContentPrerequisitesItemDto,
  PaginatedDetailsContentPrerequisitesItemDto,
} from "../../dto";

import { ContentPrerequisitesItemService } from "../../service/items";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/prerequisites-item")
export class ContentPrerequisitesItemController {
  constructor(private readonly service: ContentPrerequisitesItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create prerequisites item",
    operationId: "createContentPrerequisitesItem",
  })
  @ApiBody({
    type: CreateContentPrerequisitesItemDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentPrerequisitesItemDto,
  })
  async create(@Body() dto: CreateContentPrerequisitesItemDto): Promise<DetailsContentPrerequisitesItemDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Find all prerequisites items",
    operationId: "findAllContentPrerequisitesItems",
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
    type: PaginatedDetailsContentPrerequisitesItemDto,
  })
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentPrerequisitesItemDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Find one prerequisites item",
    operationId: "findOneContentPrerequisitesItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentPrerequisitesItemDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentPrerequisitesItemDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update prerequisites item",
    operationId: "updateContentPrerequisitesItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentPrerequisitesItemDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentPrerequisitesItemDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentPrerequisitesItemDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete prerequisites item",
    operationId: "deleteContentPrerequisitesItem",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentPrerequisitesItemDto,
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
