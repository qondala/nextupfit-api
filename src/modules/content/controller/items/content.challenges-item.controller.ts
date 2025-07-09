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

import { ContentChallengesItemService } from "../../service";
import {
  CreateContentChallengesItemDto,
  UpdateContentChallengesItemDto,
  DetailsContentChallengesItemDto,
  PaginatedDetailsContentChallengesItemDto,
} from "../../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/challenges/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentChallengesItemController {
  constructor(private readonly service: ContentChallengesItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create challenges item",
    operationId: "createContentChallengesItem",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentChallengesItemDto,
  })
  create(@Body() dto: CreateContentChallengesItemDto): Promise<DetailsContentChallengesItemDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get challenges items",
    operationId: "findAllContentChallengesItems",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentChallengesItemDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentChallengesItemDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get challenges item",
    operationId: "findOneContentChallengesItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChallengesItemDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentChallengesItemDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update challenges item",
    operationId: "updateContentChallengesItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChallengesItemDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentChallengesItemDto,
  ): Promise<DetailsContentChallengesItemDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete challenges item",
    operationId: "removeContentChallengesItem",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
