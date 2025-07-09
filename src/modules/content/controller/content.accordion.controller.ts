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
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentAccordionDto,
  })
  create(@Body() dto: CreateContentAccordionDto): Promise<DetailsContentAccordionDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get accordions",
    operationId: "findAllContentAccordions",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentAccordionDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentAccordionDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get accordion",
    operationId: "findOneContentAccordion",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentAccordionDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentAccordionDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update accordion",
    operationId: "updateContentAccordion",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentAccordionDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentAccordionDto,
  ): Promise<DetailsContentAccordionDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete accordion",
    operationId: "removeContentAccordion",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
