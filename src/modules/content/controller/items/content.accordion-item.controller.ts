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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";


import {
  CreateContentAccordionItemDto,
  UpdateContentAccordionItemDto,
  DetailsContentAccordionItemDto,
  PaginatedDetailsContentAccordionItemDto,
} from "../../dto";
import { ContentAccordionItemService } from "../../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/accordion/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentAccordionItemController {
  constructor(private readonly accordionItemService: ContentAccordionItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create accordion item",
    operationId: "createContentAccordionItem",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentAccordionItemDto,
  })
  create(@Body() dto: CreateContentAccordionItemDto): Promise<DetailsContentAccordionItemDto> {
    return this.accordionItemService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get accordion items",
    operationId: "findAllContentAccordionItems",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentAccordionItemDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentAccordionItemDto> {
    return this.accordionItemService.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get accordion item",
    operationId: "findOneContentAccordionItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentAccordionItemDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentAccordionItemDto> {
    return this.accordionItemService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update accordion item",
    operationId: "updateContentAccordionItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentAccordionItemDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentAccordionItemDto,
  ): Promise<DetailsContentAccordionItemDto> {
    return this.accordionItemService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete accordion item",
    operationId: "removeContentAccordionItem",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.accordionItemService.remove(id);
  }
}
