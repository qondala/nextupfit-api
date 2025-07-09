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

import { ContentCarouselService } from "../service";
import {
  CreateContentCarouselDto,
  UpdateContentCarouselDto,
  DetailsContentCarouselDto,
  PaginatedDetailsContentCarouselDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/carousels")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentCarouselController {
  constructor(private readonly service: ContentCarouselService) {}

  @Post()
  @ApiOperation({
    summary: "Create carousel",
    operationId: "createContentCarousel",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentCarouselDto,
  })
  create(@Body() dto: CreateContentCarouselDto): Promise<DetailsContentCarouselDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get carousels",
    operationId: "findAllContentCarousels",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentCarouselDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentCarouselDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get carousel",
    operationId: "findOneContentCarousel",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCarouselDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentCarouselDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update carousel",
    operationId: "updateContentCarousel",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCarouselDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentCarouselDto,
  ): Promise<DetailsContentCarouselDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete carousel",
    operationId: "removeContentCarousel",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
