import { ApiProperty } from "@nestjs/swagger";
import { BaseSchedulableEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";


export class DetailsUserScheduleDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: true,
  })
  userId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    required: true,
  })
  itemId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Item type",
    required: true,
  })
  itemType: BaseSchedulableEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Expected datetime",
    required: true,
  })
  expectedDatetime: Date;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Use reminder",
    required: true,
  })
  useReminder: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Remind before minutes",
    required: true,
  })
  remindBeforeMinutes: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Created at",
    required: false,
    example: "2025-05-02T00:00:00.000Z",
  })
  createdAt?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Updated at",
    required: false,
    example: "2025-05-02T00:00:00.000Z",
  })
  updatedAt?: Date;
}
