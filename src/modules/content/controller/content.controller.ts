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
  ApiQuery,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ContentService } from "../service";
import {
  CreateContentDto,
  UpdateContentDto,
  DetailsContentDto,
  PaginatedDetailsContentDto,
} from "../dto";
import { ContentContainerTypeEnum } from "../types";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Post()
  @ApiOperation({
    summary: "Create content",
    operationId: "createContent",
  })
  @ApiBody({
    type: CreateContentDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentDto,
    description: "Content created successfully",
  })
  async create(@Body() dto: CreateContentDto): Promise<DetailsContentDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get content list",
    operationId: "findAllContent",
  })
  @ApiQuery({
    name: "containerType",
    required: true,
    enum: ContentContainerTypeEnum,
    enumName: "ContentContainerTypeEnum",
  })
  @ApiQuery({
    name: "containerId",
    required: true,
    type: SwaggerType.INTEGER,
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
    type: PaginatedDetailsContentDto,
    description: "Content list found successfully",
  })
  async findAll(
    @Query("containerType") containerType: ContentContainerTypeEnum,
    @Query("containerId") containerId: number,
    @Query() q: PaginationOptionsDto
  ): Promise<PaginatedDetailsContentDto> {
    return await this.service.findAll(containerType, containerId, q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content",
    operationId: "findOneContent",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentDto,
    description: "Content found successfully",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content",
    operationId: "updateContent",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentDto,
    description: "Content updated successfully",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentDto,
  ): Promise<DetailsContentDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content",
    operationId: "removeContent",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
