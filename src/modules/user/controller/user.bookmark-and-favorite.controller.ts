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
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationOptionsDto } from '@app/common/dto';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { User } from '@app/common/decorators';

import { UserBookmarkAndFavoriteService } from '../service';
import { UserBookmarkAndFavoriteItemTypeEnum } from '../types';
import {
  CreateUserBookmarkAndFavoriteDto,
  DetailsUserBookmarkAndFavoriteDto,
  PaginatedDetailsUserBookmarkAndFavoriteDto,
  UpdateUserBookmarkAndFavoriteDto
} from '../dto';
import { SwaggerType } from '@app/common/types';
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode
} from '@app/common/exceptions';


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
    @User('id') userId: number,
    @Body() body: CreateUserBookmarkAndFavoriteDto) {
    body.userId = userId;
    return await this.bookmarkAndFavoriteService.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all user bookmarks/favorites",
    description: "Get all user bookmarks/favorites"
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
    @User('id') userId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findAll(userId, paginationOptions);
  }

  @Get('type/:type')
  @ApiOperation({
    summary: "Get all user bookmarks/favorites by type",
    description: "Get all user bookmarks/favorites by type"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmarks/favorites list retrieved successfully",
    type: PaginatedDetailsUserBookmarkAndFavoriteDto
  })
  async findByType(
    @User('id') userId: number,
    @Param('type') type: UserBookmarkAndFavoriteItemTypeEnum,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findByType(
      userId,
      type,
      paginationOptions,
    );
  }

  @Get('bookmarks')
  @ApiOperation({
    summary: "Get all user bookmarks",
    description: "Get all user bookmarks"
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
    @User('id') userId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findBookmarks(
      userId,
      paginationOptions,
    );
  }

  @Get('favorites')
  @ApiOperation({
    summary: "Get all user favorites",
    description: "Get all user favorites"
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
    @User('id') userId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findFavorites(
      userId,
      paginationOptions,
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmark/favorite updated successfully",
    type: DetailsUserBookmarkAndFavoriteDto
  })
  @ApiNotFoundResponse({
    description: "User bookmark/favorite not found",
    type: ErrorResponseException
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserBookmarkAndFavoriteDto,
  ): Promise<DetailsUserBookmarkAndFavoriteDto> {

    try {
      return await this.bookmarkAndFavoriteService.update(id, body);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ErrorResponseException(
          ErrorResponseExceptionType.DATABASE,
          error.message,
          HttpStatus.NOT_FOUND,
          SystemStatusCode.NOT_FOUND
        );
      }
      throw new InternalServerErrorException(error);
    }
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
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User bookmark/favorite deleted successfully"
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.bookmarkAndFavoriteService.delete(id);
  }

  @Get('check')
  @ApiOperation({
    summary: "Check if a user bookmark/favorite exists",
    description: "Check if a user bookmark/favorite exists"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmark/favorite checked successfully",
    type: DetailsUserBookmarkAndFavoriteDto
  })
  async checkBookmarkAndFavorite(
    @User('id') userId: number,
    @Query('itemId') itemId: number,
    @Query('type') type: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<DetailsUserBookmarkAndFavoriteDto> {
    return await this.bookmarkAndFavoriteService.findByItemId(
      userId,
      itemId,
      type,
    );
  }

  
  @Get('is-bookmarked')
  @ApiOperation({
    summary: "Check if a user bookmark exists",
    description: "Check if a user bookmark exists"
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
    type: SwaggerType.STRING,
    description: "Item type",
    example: UserBookmarkAndFavoriteItemTypeEnum.program
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User bookmark checked successfully",
    type: DetailsUserBookmarkAndFavoriteDto
  })
  async isBookmarked(
    @User('id') userId: number,
    @Query('itemId') itemId: number,
    @Query('type') type: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<boolean> {
    return await this.bookmarkAndFavoriteService.isBookmarked(
      userId,
      itemId,
      type,
    );
  }

  @Get('is-favorite')
  @ApiOperation({
    summary: "Check if a user favorite exists",
    description: "Check if a user favorite exists"
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
    type: SwaggerType.STRING,
    description: "Item type",
    example: UserBookmarkAndFavoriteItemTypeEnum.program
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User favorite checked successfully",
    type: DetailsUserBookmarkAndFavoriteDto
  })
  async isFavorite(
    @User('id') userId: number,
    @Query('itemId') itemId: number,
    @Query('type') type: UserBookmarkAndFavoriteItemTypeEnum,
  ): Promise<boolean> {
    return await this.bookmarkAndFavoriteService.isFavorite(
      userId,
      itemId,
      type,
    );
  }
}
