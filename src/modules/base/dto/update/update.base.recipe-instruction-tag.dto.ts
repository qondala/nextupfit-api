import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { BaseRecipeInstructionTagEnum } from "../../types";

export class UpdateBaseRecipeInstructionTagDto {
  @ApiProperty({
    enumName: "BaseRecipeInstructionTagEnum",
    enum: BaseRecipeInstructionTagEnum,
    required: false
  })
  tagType?: BaseRecipeInstructionTagEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  tagId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  order?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  recipeInstructionId?: number;
}
