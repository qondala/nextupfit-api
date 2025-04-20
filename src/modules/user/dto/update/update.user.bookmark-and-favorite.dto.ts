import { PartialType } from "@nestjs/swagger";

import { CreateUserBookmarkAndFavoriteDto } from "../create";

export class UpdateUserBookmarkAndFavoriteDto extends PartialType(CreateUserBookmarkAndFavoriteDto) {}
