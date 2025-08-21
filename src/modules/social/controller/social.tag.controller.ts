import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
  ParseEnumPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import { SocialTagTargetEnum } from "../types";

import {
  CreateSocialTagDto,
  UpdateSocialTagDto,
  DetailsSocialTagDto,
  PaginatedDetailsSocialTagDto,
} from "../dto";

import { SocialTagService } from "../service";

@ApiTags("Social module endpoints")
@ApiBearerAuth()
@Controller("social/tag")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialTagController {
  constructor(private readonly tagService: SocialTagService) {}

  @Post()
  @ApiOperation({
    summary: "Create a tag",
    operationId: "createTag",
  })
  @ApiBody({
    type: CreateSocialTagDto,
    description: "Tag creation data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Tag created successfully.",
    type: DetailsSocialTagDto,
  })
  create(@Body() createDto: CreateSocialTagDto): Promise<DetailsSocialTagDto> {
    return this.tagService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all tags",
    operationId: "getAllTags",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all tags.",
    type: PaginatedDetailsSocialTagDto,
  })
  findAll(
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsSocialTagDto> {
    return this.tagService.findAll(paginationOptions);
  }

  @Get("search")
  @ApiOperation({
    summary: "Search tags by text",
    operationId: "searchTags",
  })
  @ApiQuery({
    name: "q",
    required: true,
    type: SwaggerType.STRING,
    description: "Search term to find in tag text",
    example: "fitness",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return tags matching the search term.",
    type: PaginatedDetailsSocialTagDto,
  })
  searchTags(
    @Query("q") searchTerm: string,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsSocialTagDto> {
    return this.tagService.searchByTag(searchTerm, paginationOptions);
  }

  @Get("target/:target/targetId/:targetId")
  @ApiOperation({
    summary: "Get tags by target and target ID",
    operationId: "getTagsByTarget",
  })
  @ApiParam({
    name: "target",
    required: true,
    description: "Target type",
    enum: SocialTagTargetEnum,
    enumName: "SocialTagTargetEnum",
    example: SocialTagTargetEnum.program,
  })
  @ApiParam({
    name: "targetId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Target ID",
    example: 1,
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return tags for the specified target.",
    type: PaginatedDetailsSocialTagDto,
  })
  findByTarget(
    @Param("target", new ParseEnumPipe(SocialTagTargetEnum))
    target: SocialTagTargetEnum,
    @Param("targetId", ParseIntPipe) targetId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsSocialTagDto> {
    return this.tagService.findByTargetAndTargetId(
      target,
      targetId,
      paginationOptions,
    );
  }

  @Get("author/:authorUserId")
  @ApiOperation({
    summary: "Get tags by author user ID",
    operationId: "getTagsByAuthor",
  })
  @ApiParam({
    name: "authorUserId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Author user ID",
    example: 1,
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return tags created by the specified author.",
    type: PaginatedDetailsSocialTagDto,
  })
  findByAuthor(
    @Param("authorUserId", ParseIntPipe) authorUserId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsSocialTagDto> {
    return this.tagService.findByAuthorUserId(authorUserId, paginationOptions);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get tag by ID",
    operationId: "getTagById",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Tag ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the tag.",
    type: DetailsSocialTagDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsSocialTagDto> {
    return this.tagService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update tag",
    operationId: "updateTag",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Tag ID",
    example: 1,
  })
  @ApiBody({
    type: UpdateSocialTagDto,
    description: "Tag update data",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Tag updated successfully.",
    type: DetailsSocialTagDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateSocialTagDto,
  ): Promise<DetailsSocialTagDto> {
    return this.tagService.update(id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete tag",
    operationId: "deleteTag",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Tag ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Tag deleted successfully.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.tagService.remove(id);
  }
}
