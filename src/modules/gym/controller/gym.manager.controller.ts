import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
  ParseArrayPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateGymManagerDto,
  DetailsGymManagerDto,
  UpdateGymManagerDto,
  PaginatedDetailsGymManagerDto,
} from "../dto";
import { GymManagerService } from "../service";
import { SwaggerType } from "@app/common/types";
import { GymManagerSpecialityEnum } from "../types";
import { ParseEnumArrayPipe } from "@app/common/pipes";

@ApiTags("Gym module endpoints")
@ApiBearerAuth()
@Controller("gym/manager")
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymManagerController {
  constructor(private readonly gymManagerService: GymManagerService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new gym manager",
    description: "Create a new gym manager",
    operationId: "createGymManager",
  })
  @ApiBody({
    required: true,
    type: CreateGymManagerDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Gym manager created successfully.",
    type: DetailsGymManagerDto,
  })
  async create(
    @Body() createDto: CreateGymManagerDto,
  ): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.create(createDto);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get gym manager by id",
    description: "Get gym manager by id",
    operationId: "getGymManagerById",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym manager retrieved successfully.",
    type: DetailsGymManagerDto,
  })
  async getManager(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.findOne(id);
  }

  @Get("flat/:id")
  @ApiOperation({
    summary: "Get gym manager by id",
    description: "Get gym manager by id",
    operationId: "getGymManagerById",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym manager retrieved successfully.",
    type: DetailsGymManagerDto,
  })
  async getFlatManager(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.getFlatOne(id);
  }

  @Get("overview-and-user/:id")
  @ApiOperation({
    summary: "Get gym manager by id",
    description: "Get gym manager by id",
    operationId: "getGymManagerById",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym manager retrieved successfully.",
    type: DetailsGymManagerDto,
  })
  async getManagerWithUserAndOverview(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.getManagerWithUserAndOverview(id);
  }

  @Get("overview/:id")
  @ApiOperation({
    summary: "Get gym manager by id",
    description: "Get gym manager by id",
    operationId: "getGymManagerById",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym manager retrieved successfully.",
    type: DetailsGymManagerDto,
  })
  async getManagerWithOverview(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.getManagerWithOverview(id);
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get gym manager by user id",
    description: "Get gym manager by user id",
    operationId: "getGymManagerByUserId",
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym manager retrieved successfully.",
    type: DetailsGymManagerDto,
  })
  async findManagerWithUserId(
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.findManagerWithUserId(userId);
  }

  @Get("best-rated-attended")
  @ApiOperation({
    operationId: "findBestRatedAndAttendedGymManagers",
    summary: "Get best rated and attended gym managers",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of gym managers with best rated and attended overview.",
    type: PaginatedDetailsGymManagerDto,
  })
  async findBestRatedAndAttendedGymManagers(
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerDto> {
    return this.gymManagerService.findBestRatedAndAttendedGymManagers(
      pagination,
    );
  }

  @Get("best-rated-attended-overview/specializations")
  @ApiOperation({
    operationId:
      "findGymManagersWithBestRatedAndAttendedOverviewSpecializations",
    summary:
      "Get gym managers with best rated and attended overview by specializations",
  })
  @ApiQuery({
    name: "specialities",
    required: true,
    enum: GymManagerSpecialityEnum,
    enumName: "GymManagerSpecialityEnum",
    isArray: true,
    description:
      "Array of gym manager specialities (fitness, nutrition, dance)",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "List of gym managers with best rated and attended overview by specializations.",
    type: PaginatedDetailsGymManagerDto,
  })
  async findGymManagersWithBestRatedAndAttendedOverviewSpecializations(
    @Query("specialities", new ParseEnumArrayPipe(GymManagerSpecialityEnum))
    specialities: GymManagerSpecialityEnum[],
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerDto> {
    return this.gymManagerService.findGymManagersWithBestRatedAndAttendedOverviewSpecializations(
      Array.isArray(specialities) ? specialities : [specialities],
      pagination,
    );
  }

  @Get("best-rated-attended-overview/specialized-workouts-or-nutritions")
  @ApiOperation({
    operationId:
      "findGymManagersWithBestRatedAndAttendedOverviewSpecializedInWorkoutsOrNutritions",
    summary:
      "Get gym managers with best rated and attended overview specialized in workouts OR nutritions",
  })
  @ApiQuery({
    name: "specializedNutritions",
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true,
    description: "Array of nutrition IDs",
  })
  @ApiQuery({
    name: "specializedWorkouts",
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true,
    description: "Array of workout IDs",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "List of gym managers with best rated and attended overview specialized in workouts or nutritions.",
    type: PaginatedDetailsGymManagerDto,
  })
  async findGymManagersWithBestRatedAndAttendedOverviewSpecializedInWorkoutsOrNutritions(
    @Query("specializedNutritions", new ParseArrayPipe({ items: Number }))
    specializedNutritions: number[],
    @Query("specializedWorkouts", new ParseArrayPipe({ items: Number }))
    specializedWorkouts: number[],
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerDto> {
    return this.gymManagerService.findGymManagersWithBestRatedAndAttendedOverviewSpecializedInWorkoutsOrNutritions(
      Array.isArray(specializedNutritions)
        ? specializedNutritions
        : [specializedNutritions],
      Array.isArray(specializedWorkouts)
        ? specializedWorkouts
        : [specializedWorkouts],
      pagination,
    );
  }

  @Get("random/specialities")
  @ApiOperation({
    operationId: "findRandomGymManagersWithSpecialities",
    summary: "Get random gym managers with specific specialities",
  })
  @ApiQuery({
    name: "specialities",
    required: true,
    type: SwaggerType.STRING,
    isArray: true,
    description:
      "Array of gym manager specialities (fitness, nutrition, dance)",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of random gym managers with specific specialities.",
    type: PaginatedDetailsGymManagerDto,
  })
  async findRandomGymManagersWithSpecialities(
    @Query("specialities", new ParseEnumArrayPipe(GymManagerSpecialityEnum))
    specialities: GymManagerSpecialityEnum[],
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerDto> {
    return this.gymManagerService.findRandomGymManagersWithSpecialities(
      Array.isArray(specialities) ? specialities : [specialities],
      pagination,
    );
  }

  @Get("best-rated-attended/specialized-workouts-or-nutritions")
  @ApiOperation({
    operationId:
      "findBestRatedAndAttendedGymManagersSpecializedInWorkoutsOrNutritions",
    summary:
      "Get best rated and attended gym managers specialized in workouts OR nutritions",
  })
  @ApiQuery({
    name: "specializedNutritions",
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true,
    description: "Array of nutrition IDs",
  })
  @ApiQuery({
    name: "specializedWorkouts",
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true,
    description: "Array of workout IDs",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "List of best rated and attended gym managers specialized in workouts or nutritions.",
    type: PaginatedDetailsGymManagerDto,
  })
  async findBestRatedAndAttendedGymManagersSpecializedInWorkoutsOrNutritions(
    @Query("specializedNutritions", new ParseArrayPipe({ items: Number }))
    specializedNutritions: number[],
    @Query("specializedWorkouts", new ParseArrayPipe({ items: Number }))
    specializedWorkouts: number[],
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerDto> {
    return this.gymManagerService.findBestRatedAndAttendedGymManagersSpecializedInWorkoutsOrNutritions(
      Array.isArray(specializedNutritions)
        ? specializedNutritions
        : [specializedNutritions],
      Array.isArray(specializedWorkouts)
        ? specializedWorkouts
        : [specializedWorkouts],
      pagination,
    );
  }

  @Get("random/specialized-workouts-or-nutritions")
  @ApiOperation({
    operationId: "findRandomGymManagersSpecializedInWorkoutsOrNutritions",
    summary: "Get random gym managers specialized in workouts OR nutritions",
  })
  @ApiQuery({
    name: "specializedNutritions",
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true,
    description: "Array of nutrition IDs",
  })
  @ApiQuery({
    name: "specializedWorkouts",
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true,
    description: "Array of workout IDs",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "List of random gym managers specialized in workouts or nutritions.",
    type: PaginatedDetailsGymManagerDto,
  })
  async findRandomGymManagersSpecializedInWorkoutsOrNutritions(
    @Query("specializedNutritions", new ParseArrayPipe({ items: Number }))
    specializedNutritions: number[],
    @Query("specializedWorkouts", new ParseArrayPipe({ items: Number }))
    specializedWorkouts: number[],
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerDto> {
    return await this.gymManagerService.findRandomGymManagersSpecializedInWorkoutsOrNutritions(
      Array.isArray(specializedNutritions)
        ? specializedNutritions
        : [specializedNutritions],
      Array.isArray(specializedWorkouts)
        ? specializedWorkouts
        : [specializedWorkouts],
      pagination,
    );
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update gym manager",
    description: "Update gym manager",
    operationId: "updateGymManager",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    required: true,
    type: UpdateGymManagerDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym manager updated successfully.",
    type: DetailsGymManagerDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymManagerDto,
  ): Promise<DetailsGymManagerDto> {
    return await this.gymManagerService.update(id, updateDto);
  }

  @Get("search")
  @ApiOperation({
    summary: "Search gym managers",
    description: "Search gym managers",
    operationId: "searchGymManagers",
  })
  @ApiQuery({
    name: "query",
    required: true,
    type: SwaggerType.STRING,
    description: "Search query",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of gym managers.",
    type: PaginatedDetailsGymManagerDto,
  })
  async search(
    @Query("query") query: string,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerDto> {
    return await this.gymManagerService.search(query, pagination);
  }
}
