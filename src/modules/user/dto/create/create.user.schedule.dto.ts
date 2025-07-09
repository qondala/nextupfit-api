import { ApiProperty } from "@nestjs/swagger";
import { BaseSchedulableEnum } from "@app/module/base/types";


export class CreateUserScheduleDto {

  @ApiProperty({
    type: Number,
    description: "User id",
    required: true,
  })
  userId: number;

  @ApiProperty({
    type: Number,
    description: "Item id",
    required: true,
  })
  itemId: number;

  @ApiProperty({
    type: String,
    description: "Item type",
    required: true,
  })
  itemType: BaseSchedulableEnum;

  @ApiProperty({
    type: Date,
    description: "Expected datetime",
    required: true,
  })
  expectedDatetime: Date;

  @ApiProperty({
    type: Boolean,
    description: "Use reminder",
    required: true,
  })
  useReminder: boolean;

  @ApiProperty({
    type: Number,
    description: "Remind before minutes",
    required: true,
  })
  remindBeforeMinutes: number;

}
