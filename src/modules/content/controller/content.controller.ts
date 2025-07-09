import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ContentService } from "../service";
import {
  CreateContentDto,
  UpdateContentDto,
  DetailsContentDto,
  PaginatedDetailsContentDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Post()
  @ApiOperation({
    summary: "Create content",
    operationId: "createContent",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentDto,
  })
  create(@Body() dto: CreateContentDto): Promise<DetailsContentDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get content list",
    operationId: "findAllContent",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content",
    operationId: "findOneContent",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content",
    operationId: "updateContent",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentDto,
  ): Promise<DetailsContentDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content",
    operationId: "removeContent",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
