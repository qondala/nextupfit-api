import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { UserBookmarkAndFavoriteItemTypeEnum } from "../../types";


export class DetailsUserBookmarkAndFavoriteDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    enum: UserBookmarkAndFavoriteItemTypeEnum,
    enumName: "UserBookmarkAndFavoriteItemTypeEnum",
    title: "UserBookmarkAndFavoriteItemTypeEnum",
    description: "Bookmark type",
    required: true,
  })
  bookmarkType: UserBookmarkAndFavoriteItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is bookmark",
    required: true,
  })
  isBookMark: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is favorite",
    required: true,
  })
  isFavorite: boolean;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    required: true,
  })
  itemId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: true,
  })
  userId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Created at",
    required: true,
  })
  createdAt: Date;
}
