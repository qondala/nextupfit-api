import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import {
  CreateSocialUpdateContentDto,
  UpdateSocialUpdateContentDto,
  DetailsSocialUpdateContentDto,
  PaginatedDetailsSocialUpdateContentDto,
} from "../dto";

import { SocialUpdateContentService } from "../service";

@ApiTags("Social Update Content")
@ApiBearerAuth()
@Controller("social/update/content")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialUpdateContentController {
  constructor(
    private readonly socialUpdateContentService: SocialUpdateContentService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new social update content",
    operationId: "createSocialUpdateContent",
  })
  @ApiBody({
    type: CreateSocialUpdateContentDto,
    description: "Social update content data to create",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Social update content created successfully",
    type: DetailsSocialUpdateContentDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  async create(
    @Body() createSocialUpdateContentDto: CreateSocialUpdateContentDto,
  ) {
    return await this.socialUpdateContentService.create(
      createSocialUpdateContentDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: "Get all social update content with pagination",
    operationId: "getAllSocialUpdateContent",
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Items per page",
    example: 10,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update content retrieved successfully",
    type: PaginatedDetailsSocialUpdateContentDto,
  })
  async findAll(@Query() paginationOptions: PaginationOptionsDto) {
    return await this.socialUpdateContentService.findAll(paginationOptions);
  }

  @Get("social-update/:socialUpdateId")
  @ApiOperation({
    summary: "Get social update content by social update ID",
    operationId: "getSocialUpdateContentBySocialUpdateId",
  })
  @ApiParam({
    name: "socialUpdateId",
    type: SwaggerType.INTEGER,
    description: "Social update ID",
    example: 1,
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Items per page",
    example: 10,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update content retrieved successfully",
    type: PaginatedDetailsSocialUpdateContentDto,
  })
  async findBySocialUpdateId(
    @Param("socialUpdateId", ParseIntPipe) socialUpdateId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ) {
    return await this.socialUpdateContentService.findBySocialUpdateId(
      socialUpdateId,
      paginationOptions,
    );
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get social update content by content ID",
    operationId: "getSocialUpdateContentByContentId",
  })
  @ApiParam({
    name: "contentId",
    type: SwaggerType.INTEGER,
    description: "Content ID",
    example: 1,
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Items per page",
    example: 10,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update content retrieved successfully",
    type: PaginatedDetailsSocialUpdateContentDto,
  })
  async findByContentId(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ) {
    return await this.socialUpdateContentService.findByContentId(
      contentId,
      paginationOptions,
    );
  }

  @Get("social-update/:socialUpdateId/content/:contentId")
  @ApiOperation({
    summary: "Get social update content by social update ID and content ID",
    operationId: "getSocialUpdateContentBySocialUpdateIdAndContentId",
  })
  @ApiParam({
    name: "socialUpdateId",
    type: SwaggerType.INTEGER,
    description: "Social update ID",
    example: 1,
  })
  @ApiParam({
    name: "contentId",
    type: SwaggerType.INTEGER,
    description: "Content ID",
    example: 1,
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Items per page",
    example: 10,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update content retrieved successfully",
    type: PaginatedDetailsSocialUpdateContentDto,
  })
  async findBySocialUpdateIdAndContentId(
    @Param("socialUpdateId", ParseIntPipe) socialUpdateId: number,
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ) {
    return await this.socialUpdateContentService.findBySocialUpdateIdAndContentId(
      socialUpdateId,
      contentId,
      paginationOptions,
    );
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get social update content by ID",
    operationId: "getSocialUpdateContentById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social update content ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update content retrieved successfully",
    type: DetailsSocialUpdateContentDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Social update content not found",
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.socialUpdateContentService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update social update content by ID",
    operationId: "updateSocialUpdateContent",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social update content ID",
    example: 1,
  })
  @ApiBody({
    type: UpdateSocialUpdateContentDto,
    description: "Social update content data to update",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update content updated successfully",
    type: DetailsSocialUpdateContentDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Social update content not found",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSocialUpdateContentDto: UpdateSocialUpdateContentDto,
  ) {
    return await this.socialUpdateContentService.update(
      id,
      updateSocialUpdateContentDto,
    );
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete social update content by ID",
    operationId: "deleteSocialUpdateContent",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social update content ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Social update content deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Social update content not found",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return await this.socialUpdateContentService.remove(id);
  }
}
