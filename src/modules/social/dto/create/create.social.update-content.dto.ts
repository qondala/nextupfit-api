import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateSocialUpdateContentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "The ID of the social update",
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  socialUpdateId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "The ID of the content",
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  contentId: number;
}
