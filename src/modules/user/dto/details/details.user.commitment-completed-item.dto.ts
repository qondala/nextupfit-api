import { ApiProperty } from "@nestjs/swagger";

export class DetailsUserCommitmentCompletedItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userCommitementId: number;

  @ApiProperty()
  completedItemId: number;

  @ApiProperty({ required: false })
  dateCompleted?: Date;

  @ApiProperty({ required: false })
  userId?: number;

  @ApiProperty({ required: false })
  timeSpent?: number;

  @ApiProperty({ required: false })
  timeSpentUnitId?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;

  @ApiProperty({ required: false })
  dateStarted?: Date;
}
