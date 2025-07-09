import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseRecipeInstructionTagEnum } from "../../types";

export class CreateBaseRecipeInstructionTagDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    enum: BaseRecipeInstructionTagEnum,
    enumName: "BaseRecipeInstructionTagEnum",
    example: BaseRecipeInstructionTagEnum.tool,
    description: "Tag type"
  })
  @IsNotEmpty()
  @IsEnum(BaseRecipeInstructionTagEnum)
  tagType: BaseRecipeInstructionTagEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 4,
    description: "Referenced tag id"
  })
  @IsNotEmpty()
  @IsInt()
  tagId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    example: 3,
    description: "Order index"
  })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "Recipe instruction id"
  })
  @IsNotEmpty()
  @IsInt()
  recipeInstructionId: number;
}
