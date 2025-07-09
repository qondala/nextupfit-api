import { ApiProperty } from "@nestjs/swagger";
import { BaseSchedulableEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";
import { IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty } from "class-validator";


export class CreateUserScheduleDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @ApiProperty({
    enum: BaseSchedulableEnum,
    enumName: "BaseSchedulableEnum",
    description: "Item type",
    required: true,
  })
  @IsEnum(BaseSchedulableEnum)
  @IsNotEmpty()
  itemType: BaseSchedulableEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Expected datetime",
    format: "date-time",
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  expectedDatetime: Date;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Use reminder",
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  useReminder: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Remind before minutes",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  remindBeforeMinutes: number;
}
