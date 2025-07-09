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
  CreateContentUsersupportDto,
  UpdateContentUsersupportDto,
  DetailsContentUsersupportDto,
  PaginatedDetailsContentUsersupportDto,
} from "../dto";

import { ContentUsersupportService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/usersupport")
export class ContentUsersupportController {
  constructor(private readonly service: ContentUsersupportService) {}

  @Post()
  async create(@Body() dto: CreateContentUsersupportDto): Promise<DetailsContentUsersupportDto> {
    return (await this.service.create(dto)) as unknown as DetailsContentUsersupportDto;
  }

  @Get()
  async findAll(
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentUsersupportDto> {
    return this.service.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<DetailsContentUsersupportDto | null> {
    return (await this.service.findOne(id)) as unknown as DetailsContentUsersupportDto;
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() dto: UpdateContentUsersupportDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    await this.service.remove(id);
  }
}
