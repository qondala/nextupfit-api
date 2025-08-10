import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  Query,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import {
  CreateBaseEquipmentDto,
  UpdateBaseEquipmentDto,
  DetailsBaseEquipmentDto,
  PaginatedDetailsBaseEquipmentDto,
} from "../dto";

import { BaseEquipmentService } from "../service";
import { SwaggerType } from "@app/common/types";

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/equipment")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseEquipmentController {
  constructor(private readonly baseEquipmentService: BaseEquipmentService) {}

  @Post()
  @ApiOperation({
    operationId: "createBaseEquipment",
    summary: "Create a new equipment",
  })
  @ApiBody({
    type: CreateBaseEquipmentDto,
    description: "Equipment data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The equipment has been successfully created.",
    type: DetailsBaseEquipmentDto,
  })
  async create(
    @Body() createBaseEquipmentDto: CreateBaseEquipmentDto,
  ): Promise<DetailsBaseEquipmentDto> {
    return await this.baseEquipmentService.create(createBaseEquipmentDto);
  }

  @Get()
  @ApiOperation({
    operationId: "findAllBaseEquipment",
    summary: "Get all equipment with pagination",
  })
  @ApiQuery({
    name: "page",
    description: "Page number",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    description: "Number of items per page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "usageId",
    description: "Filter by equipment usage ID",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of equipment",
    type: PaginatedDetailsBaseEquipmentDto,
  })
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
    @Query("usageId") usageId?: number,
  ): Promise<PaginatedDetailsBaseEquipmentDto> {
    return this.baseEquipmentService.findAll(
      {
        page: +page,
        limit: +limit,
      },
      usageId ? +usageId : undefined,
    );
  }

  @Get(":id")
  @ApiOperation({
    operationId: "getBaseEquipmentById",
    summary: "Get a specific equipment by ID",
  })
  @ApiParam({
    name: "id",
    description: "Equipment ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The found equipment",
    type: DetailsBaseEquipmentDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsBaseEquipmentDto> {
    return await this.baseEquipmentService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({
    operationId: "updateBaseEquipment",
    summary: "Update an equipment by ID",
  })
  @ApiParam({
    name: "id",
    description: "Equipment ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateBaseEquipmentDto,
    description: "Updated equipment data",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The updated equipment",
    type: DetailsBaseEquipmentDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBaseEquipmentDto: UpdateBaseEquipmentDto,
  ): Promise<DetailsBaseEquipmentDto> {
    return await this.baseEquipmentService.update(
      id,
      updateBaseEquipmentDto,
    );
  }

  @Delete(":id")
  @ApiOperation({
    operationId: "deleteBaseEquipment",
    summary: "Delete an equipment by ID",
  })
  @ApiParam({
    name: "id",
    description: "Equipment ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The equipment has been successfully deleted",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.baseEquipmentService.remove(id);
  }
}
