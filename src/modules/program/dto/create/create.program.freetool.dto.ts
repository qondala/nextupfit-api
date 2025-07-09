import { IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';
import { ProgramItemTypeEnum } from '../../types';

export class CreateProgramFreetoolDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The type of program item',
    enum: ProgramItemTypeEnum,
    example: ProgramItemTypeEnum.activity,
  })
  @IsNotEmpty()
  @IsEnum(ProgramItemTypeEnum)
  itemType: ProgramItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the program item',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  itemId: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: 'The ID of the manager',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  managerId?: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    nullable: true,
    required: false,
    description: 'The ID of the gym',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  gymId?: number;
}
