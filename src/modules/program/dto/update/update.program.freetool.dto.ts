import {
  IsOptional,
  IsEnum,
  IsInt
} from "class-validator";
import {
  ApiPropertyOptional
} from "@nestjs/swagger";

import {
  SwaggerType
} from "@app/common/types";

import {
  ProgramItemTypeEnum
} from "../../types";

export class UpdateProgramFreetoolDto {
  @ApiPropertyOptional({
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
    description: 'The type of program item',
  })
  @IsOptional()
  @IsEnum(ProgramItemTypeEnum)
  itemType?: ProgramItemTypeEnum;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: 'The ID of the program item',
  })
  @IsOptional()
  @IsInt()
  itemId?: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: 'The ID of the manager',
  })
  @IsOptional()
  @IsInt()
  managerId?: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: 'The ID of the gym',
  })
  @IsOptional()
  @IsInt()
  gymId?: number;
}
