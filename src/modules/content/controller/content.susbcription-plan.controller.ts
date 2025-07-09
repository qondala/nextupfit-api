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
  ApiBody,
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
import { PaginationOptionsDto } from "@app/common/dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/subscription-plan")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentSusbcriptionPlanController {
  constructor(private readonly service: ContentSusbcriptionPlanService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content subscription plan",
    operationId: "createContentSubscriptionPlan",
  })
  @ApiBody({
    type: CreateContentSusbcriptionPlanDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content subscription plan created successfully",
    type: DetailsContentSusbcriptionPlanDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async create(@Body() dto: CreateContentSusbcriptionPlanDto): Promise<DetailsContentSusbcriptionPlanDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content subscription plans",
    operationId: "listContentSubscriptionPlans",
  })
  @ApiParam({
    name: "contentId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Content ID",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number for pagination",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of content subscription plans retrieved successfully",
    type: PaginatedDetailsContentSusbcriptionPlanDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentSusbcriptionPlanDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content subscription plan details by ID",
    operationId: "getContentSubscriptionPlanDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content subscription plan ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content subscription plan details retrieved successfully",
    type: DetailsContentSusbcriptionPlanDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content subscription plan not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentSusbcriptionPlanDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content subscription plan by ID",
    operationId: "updateContentSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content subscription plan ID",
  })
  @ApiBody({
    type: UpdateContentSusbcriptionPlanDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content subscription plan updated successfully",
    type: DetailsContentSusbcriptionPlanDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content subscription plan not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentSusbcriptionPlanDto,
  ): Promise<DetailsContentSusbcriptionPlanDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content subscription plan by ID",
    operationId: "deleteContentSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content subscription plan ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content subscription plan deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content subscription plan not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
