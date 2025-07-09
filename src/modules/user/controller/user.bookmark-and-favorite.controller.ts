import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';
import { PaginationOptionsDto } from '@app/common/dto';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import { UserBookmarkAndFavoriteService } from '../service';
import { UserBookmarkAndFavoriteItemTypeEnum } from '../types';
import {
  CreateUserBookmarkAndFavoriteDto,
  DetailsUserBookmarkAndFavoriteDto,
  PaginatedDetailsUserBookmarkAndFavoriteDto,
  UpdateUserBookmarkAndFavoriteDto
} from '../dto';



@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/bookmark-and-favorite")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserBookmarkAndFavoriteController {
  constructor(
    private readonly bookmarkAndFavoriteService: UserBookmarkAndFavoriteService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a user bookmark/favorite",
    description: "Create a user bookmark/favorite"
  })
  @ApiBody({
    type: CreateUserBookmarkAndFavoriteDto,
    required: true,
    description: "User bookmark/favorite creation payload"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User bookmark/favorite created successfully",
    type: DetailsUserBookmarkAndFavoriteDto
  })
  async create(
    @Body() body: CreateUserBookmarkAndFavoriteDto) {
    return await this.bookmarkAndFavoriteService.create(body);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: "Get all user bookmarks/favorites",
    description: "Get all user bookmarks/favorites"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmarks/favorites list retrieved successfully",
    type: PaginatedDetailsUserBookmarkAndFavoriteDto
  })
  async findAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findAll(userId, pagination);
  }

  @Get('type/:type/user/:userId')
  @ApiOperation({
    summary: "Get all user bookmarks/favorites by type",
    description: "Get all user bookmarks/favorites by type"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1
  })
  @ApiParam({
    name: "type",
    required: true,
    enum: UserBookmarkAndFavoriteItemTypeEnum,
    enumName: "UserBookmarkAndFavoriteItemTypeEnum",
    description: "Item type",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmarks/favorites list retrieved successfully",
    type: PaginatedDetailsUserBookmarkAndFavoriteDto
  })
  async findByType(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('type', new ParseEnumPipe(UserBookmarkAndFavoriteItemTypeEnum)) type: UserBookmarkAndFavoriteItemTypeEnum,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findByType(
      userId,
      type,
      pagination,
    );
  }

  @Get('bookmarks/user/:userId')
  @ApiOperation({
    summary: "Get all user bookmarks",
    description: "Get all user bookmarks"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmarks list retrieved successfully",
    type: PaginatedDetailsUserBookmarkAndFavoriteDto
  })
  async findBookmarks(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findBookmarks(
      userId,
      pagination,
    );
  }

  @Get('favorites/user/:userId')
  @ApiOperation({
    summary: "Get all user favorites",
    description: "Get all user favorites"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User favorites list retrieved successfully",
    type: PaginatedDetailsUserBookmarkAndFavoriteDto
  })
  async findFavorites(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findFavorites(
      userId,
      pagination,
    );
  }

  @Put(':id')
  @ApiOperation({
    summary: "Update a user bookmark/favorite",
    description: "Update a user bookmark/favorite"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User bookmark/favorite id",
    example: 1
  })
  @ApiBody({
    type: UpdateUserBookmarkAndFavoriteDto,
    required: true,
    description: "User bookmark/favorite update payload"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmark/favorite updated successfully",
    type: DetailsUserBookmarkAndFavoriteDto
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserBookmarkAndFavoriteDto,
  ): Promise<DetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.update(id, body);
  }


  @Delete(':id')
  @ApiOperation({
    summary: "Delete a user bookmark/favorite",
    description: "Delete a user bookmark/favorite"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User bookmark/favorite id",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User bookmark/favorite deleted successfully"
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.bookmarkAndFavoriteService.delete(id);
  }

  @Get('check/user/:userId')
  @ApiOperation({
    summary: "Check if a user bookmark/favorite exists",
    description: "Check if a user bookmark/favorite exists"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1
  })
  @ApiQuery({
    name: "itemId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 1
  })
  @ApiQuery({
    name: "type",
    required: true,
    enum: UserBookmarkAndFavoriteItemTypeEnum,
    enumName: "UserBookmarkAndFavoriteItemTypeEnum",
    description: "Item type",
    example: UserBookmarkAndFavoriteItemTypeEnum.program
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmark/favorite checked successfully",
    type: DetailsUserBookmarkAndFavoriteDto
  })
  async checkBookmarkAndFavorite(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('itemId', ParseIntPipe) itemId: number,
    @Query('type', new ParseEnumPipe(UserBookmarkAndFavoriteItemTypeEnum)) type: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<DetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findByItemId(
      userId,
      itemId,
      type,
    );
  }

  
  @Get('has-bookmarked/user/:userId/item/:itemId/type/:type')
  @ApiOperation({
    summary: "Check if a user bookmark exists",
    description: "Check if a user bookmark exists"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1
  })
  @ApiParam({
    name: "itemId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 1
  })
  @ApiParam({
    name: "type",
    required: true,
    enum: UserBookmarkAndFavoriteItemTypeEnum,
    enumName: "UserBookmarkAndFavoriteItemTypeEnum",
    description: "Item type",
    example: UserBookmarkAndFavoriteItemTypeEnum.program
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmark checked successfully",
    type: Boolean
  })
  async isBookmarked(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Param('type', new ParseEnumPipe(UserBookmarkAndFavoriteItemTypeEnum)) type: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<boolean> {
    return await this.bookmarkAndFavoriteService.isBookmarked(
      userId,
      itemId,
      type,
    );
  }

  @Get('has-favorite/user/:userId/item/:itemId/type/:type')
  @ApiOperation({
    summary: "Check if a user favorite exists",
    description: "Check if a user favorite exists"
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User id",
  })
  @ApiParam({
    name: "itemId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Item id",
  })
  @ApiParam({
    name: "type",
    required: true,
    enum: UserBookmarkAndFavoriteItemTypeEnum,
    enumName: "UserBookmarkAndFavoriteItemTypeEnum",
    description: "Item type",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User favorite checked successfully",
    type: Boolean
  })
  async isFavorite(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Param('type', new ParseEnumPipe(UserBookmarkAndFavoriteItemTypeEnum)) type: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<boolean> {
    return await this.bookmarkAndFavoriteService.isFavorite(
      userId,
      itemId,
      type,
    );
  }
}
