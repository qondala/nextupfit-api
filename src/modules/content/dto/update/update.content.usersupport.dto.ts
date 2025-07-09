import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateContentUsersupportDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "content id",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  contentId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Support article title",
    description: "title",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Support article description",
    description: "description",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    example: true,
    description: "display title",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  displayTitle?: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 456,
    description: "support article id",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  supportArticleId?: number;
}
