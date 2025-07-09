import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { DetailsUserCommitmentCompletedItemDto } from ".";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class DetailsUserCommitmentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record id"
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Related commitment id"
  })
  commitmentId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Date user started",
    required: false
  })
  dateUserStarted?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Date user completed",
    required: false
  })
  dateUserCompleted?: Date;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Completed flag"
  })
  completed: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Failed flag"
  })
  failed: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id"
  })
  userId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Time spent",
    required: false
  })
  timeSpent?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Time spent unit id",
    required: false
  })
  timeSpentUnitId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Created at"
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Updated at"
  })
  updatedAt: Date;

  @ApiProperty({
    type: () => DetailsUserCommitmentCompletedItemDto,
    isArray: true,
    title: "DetailsUserCommitmentCompletedItemDto[]",
    description: "User commitment completed items",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserCommitmentCompletedItemDto)
  completedItems?: DetailsUserCommitmentCompletedItemDto[];
}
