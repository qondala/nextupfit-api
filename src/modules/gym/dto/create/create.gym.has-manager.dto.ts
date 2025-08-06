import { IsInt, IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { GymManagerRoleEnum } from "../../types";

export class CreateGymHasManagerDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 345,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym manager id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerId: number;

  @ApiProperty({
    enum: GymManagerRoleEnum,
    enumName: "GymManagerRoleEnum",
    title: "GymManagerRoleEnum",
    description: "Gym manager role",
    example: GymManagerRoleEnum.owner,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GymManagerRoleEnum)
  role: GymManagerRoleEnum;
}
