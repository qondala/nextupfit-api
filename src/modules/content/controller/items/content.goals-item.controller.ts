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

import {
  CreateContentGoalsItemDto,
  UpdateContentGoalsItemDto,
  DetailsContentGoalsItemDto,
  PaginatedDetailsContentGoalsItemDto,
} from "../../dto";
import { ContentGoalsItemService } from "../../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/goals/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentGoalsItemController {
  constructor(private readonly goalsItemService: ContentGoalsItemService) {}

  @Post()
  @ApiOperation({ summary: "Create goals item", operationId: "createContentGoalsItem" })
  @ApiResponse({ status: HttpStatus.CREATED, type: DetailsContentGoalsItemDto })
  create(@Body() dto: CreateContentGoalsItemDto): Promise<DetailsContentGoalsItemDto> {
    return this.goalsItemService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get goals item list", operationId: "findAllContentGoalsItem" })
  @ApiResponse({ status: HttpStatus.OK, type: PaginatedDetailsContentGoalsItemDto })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentGoalsItemDto> {
    return this.goalsItemService.findAll(q);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get goals item", operationId: "findOneContentGoalsItem" })
  @ApiResponse({ status: HttpStatus.OK, type: DetailsContentGoalsItemDto })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentGoalsItemDto> {
    return this.goalsItemService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update goals item", operationId: "updateContentGoalsItem" })
  @ApiResponse({ status: HttpStatus.OK, type: DetailsContentGoalsItemDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentGoalsItemDto,
  ): Promise<DetailsContentGoalsItemDto> {
    return this.goalsItemService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete goals item", operationId: "removeContentGoalsItem" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.goalsItemService.remove(id);
  }
}
