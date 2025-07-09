import { IsOptional, IsEnum, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { ProgramItemTypeEnum } from '@app/module/program/types';
import { SwaggerType } from '@app/common/types';

export class UpdateGymHasProgramDto {
  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: 'The ID of the gym',
  })
  @IsOptional()
  @IsInt()
  gymId?: number;

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
    description: 'The ID of the owner manager',
  })
  @IsOptional()
  @IsInt()
  owerManagerId?: number;
}
