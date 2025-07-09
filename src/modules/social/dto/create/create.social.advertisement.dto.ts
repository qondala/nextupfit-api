import {
  IsOptional,
  IsString,
  IsEnum,
  IsInt
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { SocialAdvertisementActionEnum } from "../../types";

export class CreateSocialAdvertisementDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the program related to the advertisement",
    example: 101,
    required: true,
  })
  @IsInt()
  actionProgramId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym related to the advertisement",
    example: 202,
    required: true,
  })
  @IsInt()
  actionGymId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the manager responsible for the advertisement action",
    example: 303,
    required: true,
  })
  @IsInt()
  actionManagerId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the manager who created the advertisement",
    example: 404,
    required: true,
  })
  @IsInt()
  createdByManagerId: number;

  @ApiProperty({
    enum: SocialAdvertisementActionEnum,
    enumName: "SocialAdvertisementActionEnum",
    description: "Defines what happens when a user interacts with the advertisement",
    example: SocialAdvertisementActionEnum.openGymPage,
    required: true,
  })
  @IsEnum(SocialAdvertisementActionEnum)
  action: SocialAdvertisementActionEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "URL of the page to open when a user clicks on the advertisement",
    example: "https://example.com",
    required: false,
  })
  @IsOptional()
  @IsString()
  actionLink?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the content linked to the advertisement",
    example: 123,
    required: true,
  })
  @IsInt()
  contentId: number;
}
