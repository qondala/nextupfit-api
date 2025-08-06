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
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import { ContentTextService } from "../service";
import {
  CreateContentTextDto,
  UpdateContentTextDto,
  DetailsContentTextDto,
  PaginatedDetailsContentTextDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/text")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentTextController {
  constructor(private readonly service: ContentTextService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content text",
    operationId: "createContentText",
  })
  @ApiBody({
    type: CreateContentTextDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content text created successfully",
    type: DetailsContentTextDto,
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
    @Body() dto: CreateContentTextDto,
  ): Promise<DetailsContentTextDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content texts",
    operationId: "listContentTexts",
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
    description: "Paginated list of content texts retrieved successfully",
    type: PaginatedDetailsContentTextDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentTextDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content text details by ID",
    operationId: "getContentTextDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content text ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content text details retrieved successfully",
    type: DetailsContentTextDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content text not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentTextDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content text by ID",
    operationId: "updateContentText",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content text ID",
  })
  @ApiBody({
    type: UpdateContentTextDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content text updated successfully",
    type: DetailsContentTextDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content text not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentTextDto,
  ): Promise<DetailsContentTextDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content text by ID",
    operationId: "deleteContentText",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content text ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content text deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content text not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
