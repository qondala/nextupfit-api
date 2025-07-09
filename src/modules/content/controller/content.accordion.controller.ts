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

import { ContentAccordionService } from "../service";
import {
  CreateContentAccordionDto,
  UpdateContentAccordionDto,
  DetailsContentAccordionDto,
  PaginatedDetailsContentAccordionDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/accordion")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentAccordionController {
  constructor(private readonly service: ContentAccordionService) {}

  @Post()
  @ApiOperation({
    summary: "Create accordion",
    operationId: "createContentAccordion",
  })
  @ApiBody({
    type: CreateContentAccordionDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentAccordionDto,
  })
  async create(@Body() dto: CreateContentAccordionDto): Promise<DetailsContentAccordionDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get accordions",
    operationId: "findAllContentAccordions",
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
    type: PaginatedDetailsContentAccordionDto,
  })
  async findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentAccordionDto> {
    return await this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get accordion",
    operationId: "findOneContentAccordion",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentAccordionDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentAccordionDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update accordion",
    operationId: "updateContentAccordion",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentAccordionDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentAccordionDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentAccordionDto,
  ): Promise<DetailsContentAccordionDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiOperation({
    summary: "Delete accordion",
    operationId: "removeContentAccordion",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Accordion deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
