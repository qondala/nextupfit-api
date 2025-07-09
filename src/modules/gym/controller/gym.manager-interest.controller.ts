import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import {
  JwtAuthGuard,
  RolesGuard,
} from "@app/common/guards";
import {
  InterestPaginationDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import {
  CreateGymManagerInterestDto,
  UpdateGymManagerInterestDto,
  DetailsGymManagerInterestDto,
  PaginatedDetailsGymManagerInterestDto,
  GymFindCriteriaManagerInterestDto,
  PaginatedDetailsGymManagerDto,
} from "../dto";
import { GymManagerInterestService } from "../service";

@ApiTags("Gym module endpoints")
@ApiBearerAuth()
@Controller("gym/manager/interests")
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerInterestController {
  constructor(private readonly service: GymManagerInterestService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new gym manager interest",
    operationId: "createGymManagerInterest",
  })
  @ApiBody({
    type: CreateGymManagerInterestDto,
    description: "Gym manager interest data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Gym manager interest created successfully",
    type: DetailsGymManagerInterestDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  async create(@Body() createDto: CreateGymManagerInterestDto): Promise<DetailsGymManagerInterestDto> {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all gym manager interests",
    operationId: "getAllGymManagerInterests",
  })
  @ApiQuery({
    type: GymFindCriteriaManagerInterestDto,
    description: 'Gym manager interests find criteria',
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: 'Pagination options',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym manager interests retrieved successfully",
    type: PaginatedDetailsGymManagerInterestDto,
  })
  async findAll(
    @Query() criteria: GymFindCriteriaManagerInterestDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerInterestDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get("/user/:userId")
  @ApiOperation({
    summary: "Get user gym managers by interests",
    operationId: "getUserGymManagersByInterests",
  })
  @ApiParam({
    name: "userId",
    type: SwaggerType.INTEGER,
    description: "User ID",
    required: true,
  })
  @ApiQuery({
    type: InterestPaginationDto,
    description: 'Pagination options',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User gym manager interests retrieved successfully",
    type: PaginatedDetailsGymManagerDto,
  })
  async getUserInterests(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: InterestPaginationDto,
  ): Promise<PaginatedDetailsGymManagerDto> {
    return await this.service.getManagersByUserInterests(userId, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get gym manager interest by ID",
    operationId: "getGymManagerInterestById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Gym manager interest ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym manager interest retrieved successfully",
    type: DetailsGymManagerInterestDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsGymManagerInterestDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update gym manager interest",
    operationId: "updateGymManagerInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Gym manager interest ID",
  })
  @ApiBody({
    type: UpdateGymManagerInterestDto,
    description: "Gym manager interest update data",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym manager interest updated successfully",
    type: DetailsGymManagerInterestDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateGymManagerInterestDto,
  ): Promise<DetailsGymManagerInterestDto> {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete gym manager interest",
    operationId: "deleteGymManagerInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Gym manager interest ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Gym manager interest deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
