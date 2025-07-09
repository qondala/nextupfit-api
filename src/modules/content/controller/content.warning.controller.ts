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
  CreateContentWarningDto,
  UpdateContentWarningDto,
  DetailsContentWarningDto,
  PaginatedDetailsContentWarningDto,
} from "../dto";

import { ContentWarningService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/warning")
export class ContentWarningController {
  constructor(private readonly service: ContentWarningService) {}

  @Post()
  async create(@Body() dto: CreateContentWarningDto): Promise<DetailsContentWarningDto> {
    return (await this.service.create(dto)) as unknown as DetailsContentWarningDto;
  }

  @Get()
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentWarningDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<DetailsContentWarningDto | null> {
    return (await this.service.findOne(id)) as unknown as DetailsContentWarningDto;
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() dto: UpdateContentWarningDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    await this.service.remove(id);
  }
}
