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
  CreateContentEquipmentDto,
  UpdateContentEquipmentDto,
  DetailsContentEquipmentDto,
  PaginatedDetailsContentEquipmentDto,
} from "../dto";

import { ContentEquipmentService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/equipment")
export class ContentEquipmentController {
  constructor(private readonly service: ContentEquipmentService) {}

  @Post()
  @ApiOperation({
    summary: "Create equipment",
    operationId: "createContentEquipment",
  })
  @ApiBody({
    type: CreateContentEquipmentDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentEquipmentDto,
  })
  async create(@Body() dto: CreateContentEquipmentDto): Promise<DetailsContentEquipmentDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Find all equipment",
    operationId: "findAllContentEquipment",
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
    type: PaginatedDetailsContentEquipmentDto,
  })
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentEquipmentDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Find one equipment",
    operationId: "findOneContentEquipment",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentEquipmentDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentEquipmentDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update equipment",
    operationId: "updateContentEquipment",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentEquipmentDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentEquipmentDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentEquipmentDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete equipment",
    operationId: "deleteContentEquipment",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentEquipmentDto,
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
