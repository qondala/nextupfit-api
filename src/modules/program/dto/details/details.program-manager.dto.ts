import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsEnum, IsInt, IsOptional, ValidateNested } from "class-validator";
import { SwaggerType } from "@app/common/types";
import { ProgramItemTypeEnum } from "../../types";
import { DetailsGymDto, DetailsGymManagerDto } from "@app/module/gym/dto";
import { Type } from "class-transformer";
import { DetailsUserDto } from "@app/module/user/dto";

export class DetailsProgramManagerDto {

  @ApiProperty({
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
    title: "ProgramItemTypeEnum",
    description: "Item type",
    example: ProgramItemTypeEnum.program,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ProgramItemTypeEnum)
  itemType: ProgramItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  itemId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 4335,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  managerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 4335,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  managerId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym",
    example: 4335,
    required: false,
  })
  @IsInt()
  @IsOptional()
  gymId?: number;

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    description: "Gym manager",
    required: true,
  })
  @Type(() => DetailsGymManagerDto)
  @ValidateNested()
  manager: DetailsGymManagerDto;

  @ApiProperty({
    type: () => DetailsGymDto,
    description: "Gym",
    required: true,
  })
  @Type(() => DetailsGymDto)
  @ValidateNested()
  gym: DetailsGymDto;
}
