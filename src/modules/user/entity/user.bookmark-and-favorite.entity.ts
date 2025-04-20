import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from "typeorm";

import { UserBookmarkAndFavoriteItemTypeEnum } from "../types";


@Entity("user_bookmark_and_favorite")
export class UserBookmarkAndFavoriteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: UserBookmarkAndFavoriteItemTypeEnum,
  })
  bookmarkType: UserBookmarkAndFavoriteItemTypeEnum;


  @Column({ type: "boolean",  nullable: true, default: false})
  isBookMark: boolean;


  @Column({ type: "boolean",  nullable: true, default: false})
  isFavorite: boolean;


  @Column({ nullable: false })
  itemId: number;


  @Column({ nullable: false })
  userId: number;


  @CreateDateColumn()
  createdAt: Date;
}
