import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
} from "class-validator";
import { ProgramItemTypeEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class DetailsProgramPerSociologyDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemType: ProgramItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the sociology",
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  baseSociologyId: number;
}
