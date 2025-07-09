import { ApiProperty } from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';
import { FindOrderByEnum } from '@app/common/dto';

import { ProgramItemTypeEnum } from '../../types';

export class ProgramFindCriteriaFreetoolDto {

  @ApiProperty({
    name: 'itemType',
    description: 'The type of program item',
    enum: ProgramItemTypeEnum,
    example: ProgramItemTypeEnum.activity,
    required: false,
  })
  itemType?: ProgramItemTypeEnum;

  @ApiProperty({
    name: 'itemId',
    type: SwaggerType.INTEGER,
    description: 'The ID of the program item',
    example: 1,
    required: false,
  })
  itemId?: number;

  @ApiProperty({
    name: 'managerId',
    type: SwaggerType.INTEGER,
    description: 'The ID of the manager',
    example: 1,
    required: false,
  })
  managerId?: number;

  @ApiProperty({
    name: 'gymId',
    type: SwaggerType.INTEGER,
    description: 'The ID of the gym',
    example: 1,
    required: false,
  })
  gymId?: number;

  @ApiProperty({
    name: 'orderBy',
    enum: FindOrderByEnum,
    enumName: "FindOrderByEnum",
    description: 'The order by for the program freetools',
    required: false,
  })
  orderBy?: FindOrderByEnum;
}
