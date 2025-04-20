import {
  IsOptional,
  IsString,
  IsEnum,
  IsNotEmpty
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseHighlightColorEnum } from "@app/module/base/types";


export class CreateGymMembershipPlanFeaturesDto {

  @ApiProperty({
    description: "Plan feature description",
    example: "Free access to Gym 7/7",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    description: "Highlight feature description with following color",
    example: BaseHighlightColorEnum.blue,
    required: true,
  })
  @IsOptional()
  @IsEnum(BaseHighlightColorEnum)
  highlight?: BaseHighlightColorEnum;


  @ApiProperty({
    description: "Gym id",
    example: 345,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gymId: number;


  @ApiProperty({
    description: "Membership plan id",
    example: 42,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gymMembershipPlanId: number;
}
