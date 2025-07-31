import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  SwaggerType
} from '@app/common/types';
import {
  DetailsGymDto,
  DetailsGymManagerDto
} from '@app/module/gym/dto';

import {
  ProgramItemCompositeDto,
  ProgramItemTypeEnum
} from '../../types';


export class DetailsProgramFreetoolDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The unique identifier of the program freetool record',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The type of program item',
    enum: ProgramItemTypeEnum,
    example: ProgramItemTypeEnum.activity,
  })
  itemType: ProgramItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the program item',
    example: 1,
  })
  itemId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the manager',
    example: 1,
    nullable: true,
    required: false,
  })
  managerId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the gym',
    example: 1,
    nullable: true,
    required: false,
  })
  gymId: number;

  @ApiProperty({
    type: SwaggerType.DATE,
    format: 'date-time',
    description: 'The creation timestamp',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: 'Gym of the program freetool',
    required: false,
  })
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto;

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    title: "DetailsGymManagerDto",
    description: 'Manager of the program freetool',
    required: false,
  })
  @Type(() => DetailsGymManagerDto)
  manager?: DetailsGymManagerDto;

  @ApiProperty({
    type: () => ProgramItemCompositeDto,
    title: "ProgramItemCompositeDto",
    description: 'Program item of the freetool',
    required: true,
  })
  @Type(() => ProgramItemCompositeDto)
  item: ProgramItemCompositeDto;
}
