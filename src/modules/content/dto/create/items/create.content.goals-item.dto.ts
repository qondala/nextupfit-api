import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateContentGoalsItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content goal block id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentGoalsId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "Goal title",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "Goal description",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 0,
    required: false,
  })
  @IsInt()
  @IsOptional()
  position?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "base goal id",
    example: 1234,
    required: false,
  })
  @IsInt()
  @IsOptional()
  baseGoalId?: number;
}
