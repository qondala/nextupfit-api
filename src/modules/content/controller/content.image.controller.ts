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
  CreateContentImageDto,
  DetailsContentImageDto,
  PaginatedDetailsContentImageDto,
  UpdateContentImageDto,
} from "../dto";
import { ContentImageService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/images")
export class ContentImageController {
  constructor(private readonly service: ContentImageService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content image",
    operationId: "createContentImage",
  })
  @ApiBody({
    type: CreateContentImageDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content image created successfully",
    type: DetailsContentImageDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async create(@Body() dto: CreateContentImageDto): Promise<DetailsContentImageDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content images",
    operationId: "listContentImages",
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
    description: "Paginated list of content images retrieved successfully",
    type: PaginatedDetailsContentImageDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentImageDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content image details by ID",
    operationId: "getContentImageDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content image ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content image details retrieved successfully",
    type: DetailsContentImageDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content image not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentImageDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content image by ID",
    operationId: "updateContentImage",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content image ID",
  })
  @ApiBody({
    type: UpdateContentImageDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content image updated successfully",
    type: DetailsContentImageDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content image not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentImageDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content image by ID",
    operationId: "deleteContentImage",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content image ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content image deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content image not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
