import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
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
import { User } from "@app/common/decorators";

import {
  CreateGymManagerSpecializedInNutritionDto,
  UpdateGymManagerSpecializedInNutritionDto,
  DetailsGymManagerSpecializedInNutritionDto,
  PaginatedDetailsGymManagerSpecializedInNutritionDto,
} from "../dto";
import { GymManagerSpecializedInNutritionService } from "../service";
import { SwaggerType } from "@app/common/types";

@ApiTags("Gym module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("gym/manager/specialized-nutrition")
export class GymManagerSpecializedInNutritionController {
  constructor(private readonly service: GymManagerSpecializedInNutritionService) {}

  @Post()
  @ApiOperation({
    summary: "Create manager specialized nutrition",
    operationId: "createGymManagerSpecializedInNutrition",
  })
  @ApiBody({
    required: true,
    type: CreateGymManagerSpecializedInNutritionDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Created manager specialized nutrition",
    type: DetailsGymManagerSpecializedInNutritionDto
  })
  async create(
    @Body() dto: CreateGymManagerSpecializedInNutritionDto,
    @User("id") userId: number,
  ): Promise<DetailsGymManagerSpecializedInNutritionDto> {
    return await this.service.create(dto, userId);
  }

  @Get("manager/:managerId")
  @ApiOperation({
    summary: "List manager nutrition specializations",
    operationId: "listGymManagerSpecializedInNutritionByManagerId",
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of manager nutrition specializations",
    type: PaginatedDetailsGymManagerSpecializedInNutritionDto
  })
  async listByManager(
    @Param("managerId", ParseIntPipe) managerId: number,
    @Query() options: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymManagerSpecializedInNutritionDto> {
    return await this.service.findByManager(managerId, options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get details of a manager nutrition specialization",
    operationId: "getGymManagerSpecializedInNutrition",
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Details of a manager nutrition specialization",
    type: DetailsGymManagerSpecializedInNutritionDto
  })
  async get(@Param("id", ParseIntPipe) id: number): Promise<DetailsGymManagerSpecializedInNutritionDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update manager nutrition specialization",
    operationId: "updateGymManagerSpecializedInNutrition",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated manager nutrition specialization details",
    type: DetailsGymManagerSpecializedInNutritionDto
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateGymManagerSpecializedInNutritionDto,
    @User("id") userId: number,
  ): Promise<DetailsGymManagerSpecializedInNutritionDto> {
    return await this.service.update(id, dto, userId);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete manager nutrition specialization",
    operationId: "deleteGymManagerSpecializedInNutrition",
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Deleted manager nutrition specialization"
  })
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @User("id") userId: number
  ): Promise<void> {
    return await this.service.remove(id, userId);
  }
}
