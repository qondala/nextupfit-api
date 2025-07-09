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
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateContentWorkoutDto,
  UpdateContentWorkoutDto,
  DetailsContentWorkoutDto,
  PaginatedDetailsContentWorkoutDto,
} from "../dto";

import { ContentWorkoutService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/workout")
export class ContentWorkoutController {
  constructor(private readonly service: ContentWorkoutService) {}

  @Post()
  async create(@Body() dto: CreateContentWorkoutDto): Promise<DetailsContentWorkoutDto> {
    return (await this.service.create(dto)) as unknown as DetailsContentWorkoutDto;
  }

  @Get()
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentWorkoutDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<DetailsContentWorkoutDto | null> {
    return (await this.service.findOne(id)) as unknown as DetailsContentWorkoutDto;
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() dto: UpdateContentWorkoutDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    await this.service.remove(id);
  }
}
