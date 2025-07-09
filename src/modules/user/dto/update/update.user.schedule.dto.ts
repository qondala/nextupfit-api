import { ApiProperty } from "@nestjs/swagger";
import { BaseSchedulableEnum } from "@app/module/base/types";


export class UpdateUserScheduleDto {

  @ApiProperty({
    type: Number,
    description: "User id",
    required: false,
  })
  userId?: number;

  @ApiProperty({
    type: Number,
    description: "Item id",
    required: false,
  })
  itemId?: number;

  @ApiProperty({
    type: String,
    description: "Item type",
    required: false,
  })
  itemType?: BaseSchedulableEnum;

  @ApiProperty({
    type: Date,
    description: "Expected datetime",
    required: false,
  })
  expectedDatetime?: Date;

  @ApiProperty({
    type: Boolean,
    description: "Use reminder",
    required: false,
  })
  useReminder?: boolean;

  @ApiProperty({
    type: Number,
    description: "Remind before minutes",
    required: false,
  })
  remindBeforeMinutes?: number;

}
