import { AutoSwagger } from "@app/common/decorators";

import { UserBookmarkAndFavoriteItemTypeEnum } from "../../types";



@AutoSwagger()
export class DetailsUserBookmarkAndFavoriteDto {

  id: number;


  bookmarkType: UserBookmarkAndFavoriteItemTypeEnum;


  isBookMark: boolean;


  isFavorite: boolean;


  itemId: number;


  userId: number;


  createdAt: Date;
}
