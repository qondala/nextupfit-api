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
  CreateContentVideoDto,
  UpdateContentVideoDto,
  DetailsContentVideoDto,
  PaginatedDetailsContentVideoDto,
} from "../dto";

import { ContentVideoService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/video")
export class ContentVideoController {
  constructor(private readonly service: ContentVideoService) {}

  @Post()
  async create(@Body() dto: CreateContentVideoDto): Promise<DetailsContentVideoDto> {
    return (await this.service.create(dto)) as unknown as DetailsContentVideoDto;
  }

  @Get()
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentVideoDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<DetailsContentVideoDto | null> {
    return (await this.service.findOne(id)) as unknown as DetailsContentVideoDto;
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() dto: UpdateContentVideoDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    await this.service.remove(id);
  }
}
