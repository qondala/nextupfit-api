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
  CreateContentUsersupportDto,
  UpdateContentUsersupportDto,
  DetailsContentUsersupportDto,
  PaginatedDetailsContentUsersupportDto,
} from "../dto";

import { ContentUsersupportService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/usersupport")
export class ContentUsersupportController {
  constructor(private readonly service: ContentUsersupportService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content user support",
    operationId: "createContentUsersupport",
  })
  @ApiBody({
    type: CreateContentUsersupportDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content user support created successfully",
    type: DetailsContentUsersupportDto,
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
    @Body() dto: CreateContentUsersupportDto,
  ): Promise<DetailsContentUsersupportDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content user support",
    operationId: "listContentUsersupport",
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
    description:
      "Paginated list of content user support retrieved successfully",
    type: PaginatedDetailsContentUsersupportDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentUsersupportDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content user support details by ID",
    operationId: "getContentUsersupportDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content user support ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content user support details retrieved successfully",
    type: DetailsContentUsersupportDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content user support not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentUsersupportDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content user support by ID",
    operationId: "updateContentUsersupport",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content user support ID",
  })
  @ApiBody({
    type: UpdateContentUsersupportDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content user support updated successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content user support not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentUsersupportDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content user support by ID",
    operationId: "deleteContentUsersupport",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content user support ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content user support deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content user support not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
