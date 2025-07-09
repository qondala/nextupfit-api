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
  CreateContentImageDto,
  DetailsContentImageDto,
  PaginatedDetailsContentImageDto,
  UpdateContentImageDto,
} from "../dto";
import { ContentImageService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/images")
export class ContentImageController {
  constructor(private readonly service: ContentImageService) {}

  @Post()
  async create(@Body() dto: CreateContentImageDto): Promise<DetailsContentImageDto> {
    return (await this.service.create(dto)) as unknown as DetailsContentImageDto;
  }

  @Get()
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentImageDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<DetailsContentImageDto | null> {
    return (await this.service.findOne(id)) as unknown as DetailsContentImageDto;
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() dto: UpdateContentImageDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    await this.service.remove(id);
  }
}
