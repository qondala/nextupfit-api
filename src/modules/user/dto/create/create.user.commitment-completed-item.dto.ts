import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserCommitmentCompletedItemDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  userCommitementId: number;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsInt()
  completedItemId: number;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({ required: false, example: "2025-07-15T00:00:00Z" })
  @IsOptional()
  @IsDateString()
  dateCompleted?: Date;

  @ApiProperty({ required: false, example: "2025-07-14T12:00:00Z" })
  @IsOptional()
  @IsDateString()
  dateStarted?: Date;

  @ApiProperty({ required: false, example: 30 })
  @IsOptional()
  @IsInt()
  timeSpent?: number;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  timeSpentUnitId?: number;
}
