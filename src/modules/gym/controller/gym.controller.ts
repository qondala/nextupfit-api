import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
  ParseArrayPipe,
  ParseEnumPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode,
} from "@app/common/exceptions";

import { GymSpecialityEnum } from "../types";
import {
  CreateGymDto,
  PaginatedDetailsGymDto,
  UpdateGymDto,
  DetailsGymDto,
} from "../dto";
import { GymService } from "../service";
import { ParseEnumArrayPipe } from "@app/common/pipes";

@ApiTags("Gym module endpoints")
@ApiBearerAuth()
@Controller("gym")
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Post()
  @ApiOperation({
    operationId: "createGym",
    summary: "Create a new gym",
  })
  @ApiBody({
    required: true,
    type: CreateGymDto,
  })
  @ApiCreatedResponse({
    description: "Gym created successfully.",
    type: DetailsGymDto,
  })
  create(@Body() createDto: CreateGymDto): Promise<DetailsGymDto> {
    return this.gymService.create(createDto);
  }

  @Get("search")
  @ApiOperation({
    operationId: "searchGyms",
    summary: "Search gyms by name",
  })
  @ApiOkResponse({
    description: "Paginated list of gyms matching query.",
    type: PaginatedDetailsGymDto,
  })
  @ApiQuery({
    name: "query",
    required: true,
    type: SwaggerType.STRING,
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  async search(
    @Query("query") query: string,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.search(query, paginationOptions);
  }

  @Get()
  @ApiOperation({
    operationId: "findAllGyms",
    summary: "Get all gyms",
  })
  @ApiOkResponse({
    description: "List of gyms.",
    type: PaginatedDetailsGymDto,
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findAll(paginationOptions);
  }

  @Get("best-rated-and-attended")
  @ApiOperation({
    operationId: "findBestRatedAndAttentedGyms",
    summary: "Get best rated and attended gyms",
  })
  @ApiOkResponse({
    description: "List of gyms.",
    type: PaginatedDetailsGymDto,
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  async findBestRatedAndAttented(
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findBestRatedAndAttented(paginationOptions);
  }

  @Get(":id")
  @ApiOperation({
    operationId: "findGymById",
    summary: "Get gym by id",
  })
  @ApiOkResponse({
    description: "Gym by id.",
    type: DetailsGymDto,
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.gymService.findOne(+id);
  }

  @Get("flat/:id")
  @ApiOperation({
    operationId: "findGymFlatById",
    summary: "Get gym by id",
  })
  @ApiOkResponse({
    description: "Gym by id.",
    type: DetailsGymDto,
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  async getFlatOne(@Param("id", ParseIntPipe) id: number) {
    return await this.gymService.getFlatOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    operationId: "updateGym",
    summary: "Update gym",
  })
  @ApiOkResponse({
    description: "Updated gym.",
    type: DetailsGymDto,
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymDto,
  ): Promise<DetailsGymDto> {
    return await this.gymService.update(+id, updateDto);
  }

  @Get("best-rated-attended/specialized-workouts")
  @ApiOperation({
    operationId: "findBestRatedAndAttentedGymsSpecializedInWorkouts",
    summary:
      "Get best rated and attended gyms specialized in specific workouts",
  })
  @ApiQuery({
    name: "specializedWorkouts",
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true,
    description: "Array of workout IDs",
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  @ApiOkResponse({
    description:
      "List of best rated and attended gyms specialized in workouts.",
    type: PaginatedDetailsGymDto,
  })
  async findBestRatedAndAttentedGymsSpecializedInWorkouts(
    @Query("specializedWorkouts", new ParseArrayPipe({ items: Number }))
    specializedWorkouts: number[],
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findBestRatedAndAttentedGymsSpecializedInWorkouts(
      Array.isArray(specializedWorkouts)
        ? specializedWorkouts
        : [specializedWorkouts],
      paginationOptions,
    );
  }

  @Get("best-rated-attended/specialized-nutritions")
  @ApiOperation({
    operationId: "findBestRatedAndAttentedGymsSpecializedInNutritions",
    summary:
      "Get best rated and attended gyms specialized in specific nutritions",
  })
  @ApiQuery({
    name: "specializedNutritions",
    required: true,
    type: SwaggerType.INTEGER,
    isArray: true,
    description: "Array of nutrition IDs",
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  @ApiOkResponse({
    description:
      "List of best rated and attended gyms specialized in nutritions.",
    type: PaginatedDetailsGymDto,
  })
  async findBestRatedAndAttentedGymsSpecializedInNutritions(
    @Query("specializedNutritions", new ParseArrayPipe({ items: Number }))
    specializedNutritions: number[],
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findBestRatedAndAttentedGymsSpecializedInNutritions(
      Array.isArray(specializedNutritions)
        ? specializedNutritions
        : [specializedNutritions],
      paginationOptions,
    );
  }

  @Get("best-rated-attended/specialized-nutritions-and-workouts")
  @ApiOperation({
    operationId:
      "findBestRatedAndAttentedGymsSpecializedInNutritionsAndWorkouts",
    summary:
      "Get best rated and attended gyms specialized in both nutritions AND workouts",
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
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  @ApiOkResponse({
    description:
      "List of best rated and attended gyms specialized in both nutritions and workouts.",
    type: PaginatedDetailsGymDto,
  })
  async findBestRatedAndAttentedGymsSpecializedInNutritionsAndWorkouts(
    @Query("specializedNutritions", new ParseArrayPipe({ items: Number }))
    specializedNutritions: number[],
    @Query("specializedWorkouts", new ParseArrayPipe({ items: Number }))
    specializedWorkouts: number[],
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findBestRatedAndAttentedGymsSpecializedInNutritionsAndWorkouts(
      Array.isArray(specializedNutritions)
        ? specializedNutritions
        : [specializedNutritions],
      Array.isArray(specializedWorkouts)
        ? specializedWorkouts
        : [specializedWorkouts],
      paginationOptions,
    );
  }

  @Get("best-rated-attended/specialized-nutritions-or-workouts")
  @ApiOperation({
    operationId:
      "findBestRatedAndAttentedGymsSpecializedInNutritionsOrWorkouts",
    summary:
      "Get best rated and attended gyms specialized in nutritions OR workouts",
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
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  @ApiOkResponse({
    description:
      "List of best rated and attended gyms specialized in nutritions or workouts.",
    type: PaginatedDetailsGymDto,
  })
  async findBestRatedAndAttentedGymsSpecializedInNutritionsOrWorkouts(
    @Query("specializedNutritions", new ParseArrayPipe({ items: Number }))
    specializedNutritions: number[],
    @Query("specializedWorkouts", new ParseArrayPipe({ items: Number }))
    specializedWorkouts: number[],
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findBestRatedAndAttentedGymsSpecializedInNutritionsOrWorkouts(
      Array.isArray(specializedNutritions)
        ? specializedNutritions
        : [specializedNutritions],
      Array.isArray(specializedWorkouts)
        ? specializedWorkouts
        : [specializedWorkouts],
      paginationOptions,
    );
  }

  @Get("best-rated-attended/specialized-nutritions-and-workouts-and-speciality")
  @ApiOperation({
    operationId:
      "findBestRatedAndAttentedGymsSpecializedInNutritionsAndWorkoutsAndSpeciality",
    summary:
      "Get best rated and attended gyms specialized in nutritions AND workouts AND speciality",
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
    name: "speciality",
    required: true,
    enum: GymSpecialityEnum,
    description: "Gym speciality (fitness or nutrition)",
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  @ApiOkResponse({
    description:
      "List of best rated and attended gyms specialized in nutritions, workouts and speciality.",
    type: PaginatedDetailsGymDto,
  })
  async findBestRatedAndAttentedGymsSpecializedInNutritionsAndWorkoutsAndSpeciality(
    @Query("specializedNutritions", new ParseArrayPipe({ items: Number }))
    specializedNutritions: number[],
    @Query("specializedWorkouts", new ParseArrayPipe({ items: Number }))
    specializedWorkouts: number[],
    @Query("speciality") speciality: GymSpecialityEnum,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findBestRatedAndAttentedGymsSpecializedInNutritionsAndWorkoutsAndSpeciality(
      Array.isArray(specializedNutritions)
        ? specializedNutritions
        : [specializedNutritions],
      Array.isArray(specializedWorkouts)
        ? specializedWorkouts
        : [specializedWorkouts],
      speciality,
      paginationOptions,
    );
  }

  @Get("best-rated-attended/specialized-nutritions-or-workouts-or-speciality")
  @ApiOperation({
    operationId:
      "findBestRatedAndAttentedGymsSpecializedInNutritionsOrWorkoutsOrSpeciality",
    summary:
      "Get best rated and attended gyms specialized in nutritions OR workouts OR speciality",
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
    name: "speciality",
    required: true,
    enum: GymSpecialityEnum,
    description: "Gym speciality (fitness or nutrition)",
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  @ApiOkResponse({
    description:
      "List of best rated and attended gyms specialized in nutritions, workouts or speciality.",
    type: PaginatedDetailsGymDto,
  })
  async findBestRatedAndAttentedGymsSpecializedInNutritionsOrWorkoutsOrSpeciality(
    @Query("specializedNutritions", new ParseArrayPipe({ items: Number }))
    specializedNutritions: number[],
    @Query("specializedWorkouts", new ParseArrayPipe({ items: Number }))
    specializedWorkouts: number[],
    @Query("speciality") speciality: GymSpecialityEnum,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findBestRatedAndAttentedGymsSpecializedInNutritionsOrWorkoutsOrSpeciality(
      Array.isArray(specializedNutritions)
        ? specializedNutritions
        : [specializedNutritions],
      Array.isArray(specializedWorkouts)
        ? specializedWorkouts
        : [specializedWorkouts],
      speciality,
      paginationOptions,
    );
  }

  @Get("random/speciality")
  @ApiOperation({
    operationId: "findRandomGymsInSpeciality",
    summary: "Get random gyms in a specific speciality",
  })
  @ApiQuery({
    name: "speciality",
    required: true,
    enum: GymSpecialityEnum,
    description: "Gym speciality (fitness or nutrition)",
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  @ApiOkResponse({
    description: "List of random gyms in the specified speciality.",
    type: PaginatedDetailsGymDto,
  })
  async findRandomGymsInSpeciality(
    @Query("speciality", new ParseEnumPipe(GymSpecialityEnum))
    speciality: GymSpecialityEnum,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findRandomGymsInSpeciality(
      speciality,
      paginationOptions,
    );
  }

  @Get("random/specialities")
  @ApiOperation({
    operationId: "findRandomGymsInSpecialities",
    summary: "Get random gyms in multiple specialities",
  })
  @ApiQuery({
    name: "specialities",
    required: true,
    type: SwaggerType.STRING,
    isArray: true,
    description: "Array of gym specialities (fitness, nutrition)",
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  @ApiOkResponse({
    description: "List of random gyms in the specified specialities.",
    type: PaginatedDetailsGymDto,
  })
  async findRandomGymsInSpecialities(
    @Query("specialities", new ParseEnumArrayPipe(GymSpecialityEnum))
    specialities: GymSpecialityEnum[],
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findRandomGymsInSpecialities(
      Array.isArray(specialities) ? specialities : [specialities],
      paginationOptions,
    );
  }

  @Get("owned-by-manager")
  @ApiOperation({
    operationId: "findGymsOwnedByManager",
    summary: "Get gyms owned by a manager",
  })
  @ApiQuery({
    name: "managerId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Manager ID",
  })
  @ApiQuery({
    required: true,
    type: PaginationOptionsDto,
    description: "Pagination options",
  })
  @ApiOkResponse({
    description: "List of gyms owned by the manager.",
    type: PaginatedDetailsGymDto,
  })
  async findGymsOwnedByManager(
    @Query("managerId", ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymDto> {
    return this.gymService.findGymsOwnedByManager(managerId, paginationOptions);
  }
}
