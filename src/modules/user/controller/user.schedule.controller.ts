import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Patch,
  Delete,
  HttpStatus
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody
} from "@nestjs/swagger";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { UserScheduleService } from "../service";

import {
  CreateUserScheduleDto,
  DetailsUserScheduleDto,
  PaginatedDetailsUserScheduleDto,
  UpdateUserScheduleDto
} from "../dto";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/schedules")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserScheduleController {
  constructor(private readonly userScheduleService: UserScheduleService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new user schedule",
    operationId: "createUserSchedule"
  })
  @ApiBody({
    type: CreateUserScheduleDto,
    description: "User schedule to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the created user schedule.",
    type: DetailsUserScheduleDto,
  })
  async create(@Body() createUserScheduleDto: CreateUserScheduleDto): Promise<DetailsUserScheduleDto> {
    return await this.userScheduleService.create(createUserScheduleDto);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: "Get all user schedules with pagination",
    operationId: "findAllUserSchedules"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 123
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
    description: "Return all user schedules with pagination.",
    type: PaginatedDetailsUserScheduleDto,
  })
  async findAll(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto): Promise<PaginatedDetailsUserScheduleDto> {
    return await this.userScheduleService.findAll(userId, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a user schedule by id",
    operationId: "findOneUserSchedule"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User schedule id",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user schedule.",
    type: DetailsUserScheduleDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserScheduleDto> {
    return this.userScheduleService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a user schedule",
    operationId: "updateUserSchedule"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User schedule id",
    example: 1
  })
  @ApiBody({
    type: UpdateUserScheduleDto,
    description: "User schedule to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user schedule has been successfully updated.",
    type: DetailsUserScheduleDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserScheduleDto: UpdateUserScheduleDto
  ): Promise<DetailsUserScheduleDto> {
    return this.userScheduleService.update(id, updateUserScheduleDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a user schedule",
    operationId: "removeUserSchedule"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User schedule id",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user schedule has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userScheduleService.delete(id);
  }
}