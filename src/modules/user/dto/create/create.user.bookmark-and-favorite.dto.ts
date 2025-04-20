import { IsNotEmpty, IsEnum, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { UserBookmarkAndFavoriteItemTypeEnum } from "../../types";


export class CreateUserBookmarkAndFavoriteDto {

  @ApiProperty({
    description: "Bokmarkable element",
    example: UserBookmarkAndFavoriteItemTypeEnum.gym,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(UserBookmarkAndFavoriteItemTypeEnum)
  bookmarkType: UserBookmarkAndFavoriteItemTypeEnum;


  @ApiProperty({
    description: "Whether it is a Bookmark (or a Favorite)",
    example: true,
    required: false,
    default: true
  })
  @IsBoolean()
  isBookMark?: boolean;


  @ApiProperty({
    description: "Whether it is a Favorite (or a Bookmark)",
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  isFavorite?: boolean;


  @ApiProperty({
    description: "Id of the bookmarked element",
    example: 232232,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  itemId: number;


  @ApiProperty({
    description: "User Id who bookmarked the element",
    example: 1122423,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
