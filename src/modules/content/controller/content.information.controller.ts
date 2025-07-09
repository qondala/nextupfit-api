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
  CreateContentInformationDto,
  DetailsContentInformationDto,
  PaginatedDetailsContentInformationDto,
  UpdateContentInformationDto,
} from "../dto";
import { ContentInformationService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/information")
export class ContentInformationController {
  constructor(private readonly service: ContentInformationService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content information",
    operationId: "createContentInformation",
  })
  @ApiBody({
    type: CreateContentInformationDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content information created successfully",
    type: DetailsContentInformationDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async create(@Body() dto: CreateContentInformationDto): Promise<DetailsContentInformationDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content information",
    operationId: "listContentInformation",
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
    description: "Paginated list of content information retrieved successfully",
    type: PaginatedDetailsContentInformationDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentInformationDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content information details by ID",
    operationId: "getContentInformationDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content information ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content information details retrieved successfully",
    type: DetailsContentInformationDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content information not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentInformationDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content information by ID",
    operationId: "updateContentInformation",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content information ID",
  })
  @ApiBody({
    type: UpdateContentInformationDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content information updated successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content information not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentInformationDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content information by ID",
    operationId: "deleteContentInformation",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content information ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content information deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content information not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
