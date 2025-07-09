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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import { ContentConsumptionService } from "../service";
import {
  CreateContentConsumptionDto,
  UpdateContentConsumptionDto,
  DetailsContentConsumptionDto,
  PaginatedDetailsContentConsumptionDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/consumption")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentConsumptionController {
  constructor(private readonly service: ContentConsumptionService) {}

  @Post()
  @ApiOperation({
    summary: "Create consumption",
    operationId: "createContentConsumption",
  })
  @ApiBody({
    type: CreateContentConsumptionDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentConsumptionDto,
  })
  async create(@Body() dto: CreateContentConsumptionDto): Promise<DetailsContentConsumptionDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get consumption",
    operationId: "findAllContentConsumption",
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
    type: PaginatedDetailsContentConsumptionDto,
  })
  async findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentConsumptionDto> {
    return await this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get consumption",
    operationId: "findOneContentConsumption",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentConsumptionDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentConsumptionDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update consumption",
    operationId: "updateContentConsumption",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentConsumptionDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentConsumptionDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentConsumptionDto,
  ): Promise<DetailsContentConsumptionDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete consumption",
    operationId: "removeContentConsumption",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Consumption deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
