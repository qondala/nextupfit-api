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
  CreateContentInformationDto,
  DetailsContentInformationDto,
  PaginatedDetailsContentInformationDto,
  UpdateContentInformationDto,
} from "../dto";
import { ContentInformationService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/information")
export class ContentInformationController {
  constructor(private readonly service: ContentInformationService) {}

  @Post()
  async create(@Body() dto: CreateContentInformationDto): Promise<DetailsContentInformationDto> {
    return (await this.service.create(dto)) as unknown as DetailsContentInformationDto;
  }

  @Get()
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentInformationDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<DetailsContentInformationDto | null> {
    return (await this.service.findOne(id)) as unknown as DetailsContentInformationDto;
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() dto: UpdateContentInformationDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    await this.service.remove(id);
  }
}
