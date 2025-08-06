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
  ParseEnumPipe,
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
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateGymInterestDto,
  UpdateGymInterestDto,
  DetailsGymInterestDto,
  PaginatedDetailsGymInterestDto,
  GymFindCriteriaInterestDto,
  PaginatedDetailsGymDto,
  GymFindOrderFreetoolEnum,
} from "../dto";
import { GymInterestService } from "../service";

@ApiTags("Gym module endpoints")
@ApiBearerAuth()
@Controller("gym/interests")
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymInterestController {
  constructor(private readonly service: GymInterestService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new gym interest",
    operationId: "createGymInterest",
  })
  @ApiBody({
    type: CreateGymInterestDto,
    description: "Gym interest data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Gym interest created successfully",
    type: DetailsGymInterestDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  async create(
    @Body() createDto: CreateGymInterestDto,
  ): Promise<DetailsGymInterestDto> {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all gym interests",
    operationId: "getAllGymInterests",
  })
  @ApiQuery({
    type: GymFindCriteriaInterestDto,
    description: "Gym interests find criteria",
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym interests retrieved successfully",
    type: PaginatedDetailsGymInterestDto,
  })
  async findAll(
    @Query() criteria: GymFindCriteriaInterestDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymInterestDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get("/user/:userId")
  @ApiOperation({
    summary: "Get user gyms by interests",
    operationId: "getUserGymsByInterests",
  })
  @ApiParam({
    name: "userId",
    type: SwaggerType.INTEGER,
    description: "User ID",
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiQuery({
    name: "order",
    enum: GymFindOrderFreetoolEnum,
    enumName: "GymFindOrderFreetoolEnum",
    description: "Order by",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User interested gyms retrieved successfully",
    type: PaginatedDetailsGymDto,
  })
  async getUserInterestedGyms(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
    @Query("order", new ParseEnumPipe(GymFindOrderFreetoolEnum))
    order: GymFindOrderFreetoolEnum,
  ): Promise<PaginatedDetailsGymDto> {
    return await this.service.getUserInterestedGyms(userId, pagination, order);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get gym interest by ID",
    operationId: "getGymInterestById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Gym interest ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym interest retrieved successfully",
    type: DetailsGymInterestDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsGymInterestDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update gym interest",
    operationId: "updateGymInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Gym interest ID",
  })
  @ApiBody({
    type: UpdateGymInterestDto,
    description: "Gym interest update data",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym interest updated successfully",
    type: DetailsGymInterestDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateGymInterestDto,
  ): Promise<DetailsGymInterestDto> {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete gym interest",
    operationId: "deleteGymInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Gym interest ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Gym interest deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
