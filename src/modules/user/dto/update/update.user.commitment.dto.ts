import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { IsBoolean, IsDate, IsInt, IsOptional } from "class-validator";

export class UpdateUserCommitmentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Related commitment id",
    example: 123,
    required: false,
  })
  @IsInt()
  @IsOptional()
  commitmentId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Date the user started the commitment",
    example: new Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  dateUserStarted?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Date the user completed the commitment",
    example: new Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  dateUserCompleted?: Date;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the commitment is completed",
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean = false;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the commitment is failed",
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  failed?: boolean = false;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id owning the commitment",
    example: 456,
    required: false,
  })
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Time spent value",
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsInt()
  timeSpent?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Time spent unit id (e.g., minutes, hours)",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  timeSpentUnitId?: number;
}
