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

import { ContentCarouselItemService } from "../../service";
import {
  CreateContentCarouselItemDto,
  UpdateContentCarouselItemDto,
  DetailsContentCarouselItemDto,
  PaginatedDetailsContentCarouselItemDto,
} from "../../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/carousel/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentCarouselItemController {
  constructor(private readonly service: ContentCarouselItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create carousel item",
    operationId: "createContentCarouselItem",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentCarouselItemDto,
  })
  create(@Body() dto: CreateContentCarouselItemDto): Promise<DetailsContentCarouselItemDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get carousel items",
    operationId: "findAllContentCarouselItems",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentCarouselItemDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentCarouselItemDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get carousel item",
    operationId: "findOneContentCarouselItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCarouselItemDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentCarouselItemDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update carousel item",
    operationId: "updateContentCarouselItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCarouselItemDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentCarouselItemDto,
  ): Promise<DetailsContentCarouselItemDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete carousel item",
    operationId: "removeContentCarouselItem",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
