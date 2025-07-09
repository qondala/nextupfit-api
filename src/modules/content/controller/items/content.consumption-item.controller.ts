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

import { ContentConsumptionItemService } from "../../service";
import {
  CreateContentConsumptionItemDto,
  UpdateContentConsumptionItemDto,
  DetailsContentConsumptionItemDto,
  PaginatedDetailsContentConsumptionItemDto,
} from "../../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/consumption/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentConsumptionItemController {
  constructor(private readonly service: ContentConsumptionItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create consumption item",
    operationId: "createContentConsumptionItem",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentConsumptionItemDto,
  })
  create(@Body() dto: CreateContentConsumptionItemDto): Promise<DetailsContentConsumptionItemDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get consumption items",
    operationId: "findAllContentConsumptionItems",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentConsumptionItemDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentConsumptionItemDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get consumption item",
    operationId: "findOneContentConsumptionItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentConsumptionItemDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentConsumptionItemDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update consumption item",
    operationId: "updateContentConsumptionItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentConsumptionItemDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentConsumptionItemDto,
  ): Promise<DetailsContentConsumptionItemDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete consumption item",
    operationId: "removeContentConsumptionItem",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
