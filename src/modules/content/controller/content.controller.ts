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
  ParseArrayPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { ParseEnumArrayPipe } from "@app/common/pipes";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SocialActorEnum } from "@app/module/social/types";

import {
  CreateContentDto,
  UpdateContentDto,
  DetailsContentDto,
  PaginatedDetailsContentDto,
  ContentFindCriteriaDto,
  ContentFindOrderEnum,
} from "../dto";
import {
  ContentContainerTypeEnum,
  ContentPrivacyEnum,
  ContentStatusEnum,
  ContentTypeEnum,
} from "../types";

import { ContentService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Post()
  @ApiOperation({
    summary: "Create content",
    operationId: "createContent",
  })
  @ApiBody({
    type: CreateContentDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentDto,
    description: "Content created successfully",
  })
  async create(@Body() dto: CreateContentDto): Promise<DetailsContentDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get content list",
    operationId: "findAllContent",
  })
  @ApiQuery({
    name: "contentType",
    enum: ContentTypeEnum,
    enumName: "ContentTypeEnum",
    description: "Search by content type",
    example: ContentTypeEnum.text,
    required: false,
  })
  @ApiQuery({
    name: "containerId",
    type: SwaggerType.INTEGER,
    description: "Search by container id",
    example: 1234,
    required: false,
  })
  @ApiQuery({
    name: "containerType",
    enum: ContentContainerTypeEnum,
    enumName: "ContentContainerTypeEnum",
    description: "Search by content container type",
    example: ContentContainerTypeEnum.gym,
    required: false,
  })
  @ApiQuery({
    name: "status",
    enum: ContentStatusEnum,
    enumName: "ContentStatusEnum",
    description: "Search by content status",
    example: ContentStatusEnum.published,
    required: false,
  })
  @ApiQuery({
    name: "ownerUserId",
    type: SwaggerType.INTEGER,
    description: "Search by owner user id",
    example: 1234,
    required: false,
  })
  @ApiQuery({
    name: "ownerManagerId",
    type: SwaggerType.INTEGER,
    description: "Search by owner manager id",
    example: 1234,
    required: false,
  })
  @ApiQuery({
    name: "ownerGymId",
    type: SwaggerType.INTEGER,
    description: "Search by gym id",
    example: 1234,
    required: false,
  })
  @ApiQuery({
    name: "ownerType",
    enum: SocialActorEnum,
    enumName: "SocialActorEnum",
    description: "Search by owner type",
    example: SocialActorEnum.user,
    required: false,
  })
  @ApiQuery({
    name: "orderBy",
    enum: ContentFindOrderEnum,
    enumName: "ContentFindOrderEnum",
    description: "Search by content order",
    example: ContentFindOrderEnum.position,
    required: false,
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
    type: PaginatedDetailsContentDto,
    description: "Content list found successfully",
  })
  async findAll(
    @Query() criteria: ContentFindCriteriaDto,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentDto> {
    return await this.service.findAll(criteria, pagination);
  }

  @Get("social-actor/:ownerSocialActorId/type/:socialActorType")
  @ApiOperation({
    summary: "Get social actor contents",
    operationId: "findSocialActorContents",
  })
  @ApiParam({
    name: "ownerSocialActorId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiParam({
    name: "socialActorType",
    enum: SocialActorEnum,
    enumName: "SocialActorEnum",
    description: "Search by social actor type",
    example: SocialActorEnum.manager,
    required: true,
  })
  @ApiQuery({
    name: "mediaContentTypes",
    enum: ContentTypeEnum,
    enumName: "ContentTypeEnum",
    isArray: true,
    description: "Search by media content type",
    example: ContentTypeEnum.text,
    required: false,
  })
  @ApiQuery({
    name: "contentPrivacies",
    enum: ContentPrivacyEnum,
    enumName: "ContentPrivacyEnum",
    isArray: true,
    description: "Search by content privacy",
    example: ContentPrivacyEnum.public,
    required: false,
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
    type: PaginatedDetailsContentDto,
    description: "Content list found successfully",
  })
  async findSocialActorContents(
    @Param("ownerSocialActorId", ParseIntPipe) ownerSocialActorId: number,
    @Param("socialActorType") socialActorType: SocialActorEnum,
    @Query("mediaContentTypes", new ParseEnumArrayPipe(ContentTypeEnum, true))
    mediaContentTypes: ContentTypeEnum[],
    @Query("contentPrivacies", new ParseEnumArrayPipe(ContentPrivacyEnum, true))
    contentPrivacies: ContentPrivacyEnum[],
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentDto> {
    return await this.service.findSocialActorContents(
      ownerSocialActorId,
      socialActorType,
      mediaContentTypes,
      contentPrivacies,
      pagination,
    );
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content",
    operationId: "findOneContent",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentDto,
    description: "Content found successfully",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content",
    operationId: "updateContent",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentDto,
    description: "Content updated successfully",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentDto,
  ): Promise<DetailsContentDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content",
    operationId: "removeContent",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
