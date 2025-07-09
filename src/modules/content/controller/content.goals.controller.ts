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
  CreateContentGoalsDto,
  DetailsContentGoalsDto,
  PaginatedDetailsContentGoalsDto,
  UpdateContentGoalsDto,
} from "../dto";
import { ContentGoalsService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/goals")
export class ContentGoalsController {
  constructor(private readonly service: ContentGoalsService) {}

  @Post()
  async create(@Body() dto: CreateContentGoalsDto): Promise<DetailsContentGoalsDto> {
    return this.service.create(dto) as unknown as DetailsContentGoalsDto;
  }

  @Get()
  async list(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentGoalsDto> {
    return this.service.findAll(query) as unknown as PaginatedDetailsContentGoalsDto;
  }

  @Get(":id")
  async details(@Param("id") id: number): Promise<DetailsContentGoalsDto> {
    return this.service.findOne(id) as unknown as DetailsContentGoalsDto;
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() dto: UpdateContentGoalsDto,
  ): Promise<DetailsContentGoalsDto> {
    return this.service.update(id, dto) as unknown as DetailsContentGoalsDto;
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.service.remove(id);
  }
}
