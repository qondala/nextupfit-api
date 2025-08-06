import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import {
  CreateContentGoalsDto,
  DetailsContentGoalsDto,
  PaginatedDetailsContentGoalsDto,
  UpdateContentGoalsDto,
} from "../dto";
import { ContentGoalsService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/goals")
export class ContentGoalsController {
  constructor(private readonly service: ContentGoalsService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content goal",
    operationId: "createContentGoal",
  })
  @ApiBody({
    type: CreateContentGoalsDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content goal created successfully",
    type: DetailsContentGoalsDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async create(
    @Body() dto: CreateContentGoalsDto,
  ): Promise<DetailsContentGoalsDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content goals",
    operationId: "listContentGoals",
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
    description: "Paginated list of content goals retrieved successfully",
    type: PaginatedDetailsContentGoalsDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentGoalsDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content goal details by ID",
    operationId: "getContentGoalDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content goal ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content goal details retrieved successfully",
    type: DetailsContentGoalsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content goal not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async details(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentGoalsDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content goal by ID",
    operationId: "updateContentGoal",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content goal ID",
  })
  @ApiBody({ type: UpdateContentGoalsDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content goal updated successfully",
    type: DetailsContentGoalsDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content goal not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentGoalsDto,
  ): Promise<DetailsContentGoalsDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content goal by ID",
    operationId: "deleteContentGoal",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content goal ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content goal deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content goal not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
