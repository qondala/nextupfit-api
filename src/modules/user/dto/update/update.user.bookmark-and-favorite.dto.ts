import {
    IsEnum,
    IsBoolean,
    IsOptional,
    IsInt
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { UserBookmarkAndFavoriteItemTypeEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class UpdateUserBookmarkAndFavoriteDto {

  @ApiProperty({
    enum: UserBookmarkAndFavoriteItemTypeEnum,
    enumName: "UserBookmarkAndFavoriteItemTypeEnum",
    title: "UserBookmarkAndFavoriteItemTypeEnum",
    description: "Bokmarkable element",
    example: UserBookmarkAndFavoriteItemTypeEnum.gym,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserBookmarkAndFavoriteItemTypeEnum)
  bookmarkType?: UserBookmarkAndFavoriteItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether it is a Bookmark (or a Favorite)",
    example: true,
    required: false,
    default: true
  })
  @IsBoolean()
  isBookMark?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether it is a Favorite (or a Bookmark)",
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  isFavorite?: boolean;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the bookmarked element",
    example: 232232,
    required: false
  })
  @IsOptional()
  @IsInt()
  itemId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User Id who bookmarked the element",
    example: 1122423,
    required: false
  })
  @IsOptional()
  @IsInt()
  userId?: number;
}

