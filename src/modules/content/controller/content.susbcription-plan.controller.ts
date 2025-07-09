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
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import { ContentSusbcriptionPlanService } from "../service";
import {
  CreateContentSusbcriptionPlanDto,
  UpdateContentSusbcriptionPlanDto,
  DetailsContentSusbcriptionPlanDto,
  PaginatedDetailsContentSusbcriptionPlanDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/subscription-plan")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentSusbcriptionPlanController {
  constructor(private readonly service: ContentSusbcriptionPlanService) {}

  @Post()
  @ApiOperation({
    summary: "Create content subscription plan",
    operationId: "createContentSubscriptionPlan"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentSusbcriptionPlanDto,
  })
  create(@Body() dto: CreateContentSusbcriptionPlanDto): Promise<DetailsContentSusbcriptionPlanDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get content subscription plans",
    operationId: "getContentSubscriptionPlans",
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
    type: PaginatedDetailsContentSusbcriptionPlanDto,
  })
  findAll(@Query("page") page = 1, @Query("limit") limit = 10): Promise<PaginatedDetailsContentSusbcriptionPlanDto> {
    return this.service.findAll({ page: +page, limit: +limit });
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content subscription plan by id",
    operationId: "getContentSubscriptionPlanById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentSusbcriptionPlanDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentSusbcriptionPlanDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content subscription plan",
    operationId: "updateContentSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentSusbcriptionPlanDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentSusbcriptionPlanDto,
  ): Promise<DetailsContentSusbcriptionPlanDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content subscription plan",
    operationId: "deleteContentSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
