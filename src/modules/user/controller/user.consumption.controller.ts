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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PaginationOptionsDto } from "@app/common/dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";

import { UserConsumptionService } from "../service";
import {
  CreateUserConsumptionDto,
  UpdateUserConsumptionDto,
  DetailsUserConsumptionDto,
  PaginatedDetailsUserConsumptionDto,
} from "../dto";
import { SwaggerType } from "@app/common/types";

@ApiTags("User module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("user/consumption")
export class UserConsumptionController {
  constructor(private readonly userConsumptionService: UserConsumptionService) {}

  @Post()
  @ApiOperation({
    summary: "Create a user consumption",
    operationId: "createUserConsumption"
  })
  @ApiBody({
    required: true,
    type: CreateUserConsumptionDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User consumption created successfully",
    type: DetailsUserConsumptionDto
  })
  async create(@Body() dto: CreateUserConsumptionDto): Promise<DetailsUserConsumptionDto> {
    return await this.userConsumptionService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all user consumptions",
    operationId: "findAllUserConsumptions"
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of user consumptions.",
    type: PaginatedDetailsUserConsumptionDto
  })
  async findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsUserConsumptionDto> {
    return await this.userConsumptionService.findAll(options);
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get user consumptions by user id",
    operationId: "getUserConsumptionsByUserId"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 123
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of user consumptions by user id.",
    type: PaginatedDetailsUserConsumptionDto
  })
  async getUserConsumptions(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserConsumptionDto> {
    return await this.userConsumptionService.getUserConsumptions(userId, options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get user consumption by id",
    operationId: "findUserConsumptionById"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User consumption by id.",
    type: DetailsUserConsumptionDto
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserConsumptionDto> {
    return await this.userConsumptionService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update user consumption",
    operationId: "updateUserConsumption"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User consumption id",
    example: 1
  })
  @ApiBody({
    required: true,
    type: UpdateUserConsumptionDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated user consumption.",
    type: DetailsUserConsumptionDto
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserConsumptionDto
  ): Promise<DetailsUserConsumptionDto> {
    return await this.userConsumptionService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete user consumption",
    operationId: "removeUserConsumption"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User consumption id",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User consumption deleted successfully."
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.userConsumptionService.remove(id);
  }
}
