import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional } from "class-validator";

export class UpdateUserCommitmentCompletedItemDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  userCommitementId?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  completedItemId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiPropertyOptional({ example: "2025-07-15T00:00:00Z" })
  @IsOptional()
  @IsDateString()
  dateCompleted?: Date;

  @ApiPropertyOptional({ example: "2025-07-14T12:00:00Z" })
  @IsOptional()
  @IsDateString()
  dateStarted?: Date;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  timeSpent?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  timeSpentUnitId?: number;
}
