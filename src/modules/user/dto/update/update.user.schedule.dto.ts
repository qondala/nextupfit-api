import { ApiProperty } from "@nestjs/swagger";
import { BaseSchedulableEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";


export class UpdateUserScheduleDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: false,
  })
  userId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    required: false,
  })
  itemId?: number;

  @ApiProperty({
    enum: BaseSchedulableEnum,
    enumName: "BaseSchedulableEnum",
    description: "Item type",
    required: false,
  })
  itemType?: BaseSchedulableEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Expected datetime",
    required: false,
  })
  expectedDatetime?: Date;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Use reminder",
    required: false,
  })
  useReminder?: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Remind before minutes",
    required: false,
  })
  remindBeforeMinutes?: number;
}
