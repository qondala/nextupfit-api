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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

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
  @ApiBody({
    type: CreateContentCarouselDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentCarouselDto,
  })
  async create(@Body() dto: CreateContentCarouselDto): Promise<DetailsContentCarouselDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get carousels",
    operationId: "findAllContentCarousels",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentCarouselDto,
  })
  async findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentCarouselDto> {
    return await this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get carousel",
    operationId: "findOneContentCarousel",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCarouselDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentCarouselDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update carousel",
    operationId: "updateContentCarousel",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentCarouselDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCarouselDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentCarouselDto,
  ): Promise<DetailsContentCarouselDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete carousel",
    operationId: "removeContentCarousel",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Carousel deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
