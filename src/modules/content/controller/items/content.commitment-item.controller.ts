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

import { ContentCommitmentItemService } from "../../service";
import {
  CreateContentCommitmentItemDto,
  UpdateContentCommitmentItemDto,
  DetailsContentCommitmentItemDto,
  PaginatedDetailsContentCommitmentItemDto,
} from "../../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/commitment/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentCommitmentItemController {
  constructor(private readonly service: ContentCommitmentItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create commitment item",
    operationId: "createContentCommitmentItem",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentCommitmentItemDto,
  })
  create(@Body() dto: CreateContentCommitmentItemDto): Promise<DetailsContentCommitmentItemDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get commitment items",
    operationId: "findAllContentCommitmentItems",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentCommitmentItemDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentCommitmentItemDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get commitment item",
    operationId: "findOneContentCommitmentItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCommitmentItemDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentCommitmentItemDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update commitment item",
    operationId: "updateContentCommitmentItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCommitmentItemDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentCommitmentItemDto,
  ): Promise<DetailsContentCommitmentItemDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete commitment item",
    operationId: "removeContentCommitmentItem",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
