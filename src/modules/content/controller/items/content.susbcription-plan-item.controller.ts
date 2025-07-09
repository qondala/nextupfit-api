import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateContentSusbcriptionPlanItemDto,
  DetailsContentSusbcriptionPlanItemDto,
  PaginatedDetailsContentSusbcriptionPlanItemDto,
  UpdateContentSusbcriptionPlanItemDto,
} from "../../dto";

import { ContentSusbcriptionPlanItemService } from "../../service";


@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/subscription-plan-item")
export class ContentSusbcriptionPlanItemController {
  constructor(private readonly service: ContentSusbcriptionPlanItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create subscription plan item",
    operationId: "createContentSubscriptionPlanItem",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentSusbcriptionPlanItemDto,
  })
  create(@Body() dto: CreateContentSusbcriptionPlanItemDto): Promise<DetailsContentSusbcriptionPlanItemDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "List subscription plan items",
    operationId: "listContentSubscriptionPlanItems",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentSusbcriptionPlanItemDto,
  })
  list(
    @Query() options: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentSusbcriptionPlanItemDto> {
    return this.service.findAll(options);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get subscription plan item details",
    operationId: "getContentSubscriptionPlanItemDetails",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentSusbcriptionPlanItemDto,
  })
  get(@Param("id") id: number): Promise<DetailsContentSusbcriptionPlanItemDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update subscription plan item",
    operationId: "updateContentSubscriptionPlanItem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentSusbcriptionPlanItemDto,
  })
  update(
    @Param("id") id: number,
    @Body() dto: UpdateContentSusbcriptionPlanItemDto,
  ): Promise<DetailsContentSusbcriptionPlanItemDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete subscription plan item",
    operationId: "deleteContentSubscriptionPlanItem",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async delete(@Param("id") id: number): Promise<void> {
    await this.service.remove(id);
  }
}
