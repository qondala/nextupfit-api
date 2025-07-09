import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseBodyPartEnum } from "../../types";

export class DetailsBaseMuscleDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "Record identifier",
    required: true
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: "Biceps",
    description: "Muscle name",
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: BaseBodyPartEnum,
    enumName: "BaseBodyPartEnum",
    example: BaseBodyPartEnum.arms,
    description: "Body part group",
    required: true
  })
  @IsEnum(BaseBodyPartEnum)
  bodyPart: BaseBodyPartEnum;

  @ApiProperty({
    example: "https://cdn.example.com/biceps.svg",
    description: "Icon URL",
    required: true
  })
  @IsUrl()
  iconUrl: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "Display order",
    required: false
  })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({
    example: "biceps",
    description: "Unique code",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Creation timestamp"
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Last update timestamp"
  })
  updatedAt: Date;
}
