import { IsInt, IsEnum, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { GymManagerRoleEnum, GymManagerStatusEnum } from "../../types";

export class UpdateGymHasManagerDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 345,
    required: false,
  })
  @IsOptional()
  @IsInt()
  gymId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym manager id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  managerId?: number;

  @ApiProperty({
    enum: GymManagerRoleEnum,
    enumName: "GymManagerRoleEnum",
    title: "GymManagerRoleEnum",
    description: "Gym manager role",
    example: GymManagerRoleEnum.owner,
    required: false,
  })
  @IsOptional()
  @IsEnum(GymManagerRoleEnum)
  role?: GymManagerRoleEnum;

  @ApiProperty({
    description: "Status of the gym manager",
    enum: GymManagerStatusEnum,
    enumName: "GymManagerStatusEnum",
    title: "GymManagerStatusEnum",
    example: GymManagerStatusEnum.active,
    required: false,
  })
  @IsOptional()
  @IsEnum(GymManagerStatusEnum)
  status?: GymManagerStatusEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Last status update of the gym manager",
    example: "2022-01-01T00:00:00.000Z",
    required: false,
    format: "date-time",
  })
  @IsOptional()
  lastStatusUpdate?: Date;
}
