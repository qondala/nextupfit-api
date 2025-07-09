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
  Delete
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { UserScheduleService } from "../service";

import {
  CreateUserScheduleDto,
  DetailsUserScheduleDto,
  PaginatedDetailsUserScheduleDto,
  UpdateUserScheduleDto
} from "../dto";
import { PaginationOptionsDto } from "@app/common/dto";

@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/schedules")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserScheduleController {
  constructor(private readonly userScheduleService: UserScheduleService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user schedule" })
  @ApiResponse({
    status: 200,
    description: "Return the created user schedule.",
    type: DetailsUserScheduleDto,
  })
  async create(@Body() createUserScheduleDto: CreateUserScheduleDto): Promise<DetailsUserScheduleDto> {
    return await this.userScheduleService.create(createUserScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all user schedules with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all user schedules with pagination.",
    type: PaginatedDetailsUserScheduleDto,
  })
  async findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsUserScheduleDto> {
    return this.userScheduleService.findAll(options);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user schedule by id" })
  @ApiResponse({
    status: 200,
    description: "Return the user schedule.",
    type: DetailsUserScheduleDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserScheduleDto> {
    return this.userScheduleService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user schedule" })
  @ApiResponse({
    status: 200,
    description: "The user schedule has been successfully updated.",
    type: DetailsUserScheduleDto,
  })
  async update(@Param("id", ParseIntPipe) id: number, @Body() updateUserScheduleDto: UpdateUserScheduleDto): Promise<DetailsUserScheduleDto> {
    return this.userScheduleService.update(id, updateUserScheduleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user schedule" })
  @ApiResponse({
    status: 200,
    description: "The user schedule has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userScheduleService.delete(id);
  }
}