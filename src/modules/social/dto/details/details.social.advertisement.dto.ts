import {
  IsOptional,
  IsString,
  IsEnum,
  IsInt
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { SocialAdvertisementActionEnum } from "../../types";
import { DetailsContentDto } from "@app/module/content/dto";
import { Type } from "class-transformer";

export class DetailsSocialAdvertisementDto {

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


  @ApiProperty({
    type: SwaggerType.DATE,
    description: "Date when the advertisement was created",
    example: "2022-01-01T00:00:00.000Z",
    format: 'date-time',
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.DATE,
    description: "Date when the advertisement was last updated",
    example: "2022-01-01T00:00:00.000Z",
    format: 'date-time',
    required: true,
  })
  updatedAt: Date;


  @ApiProperty({
    type: () => DetailsContentDto,
    description: "Content linked to the advertisement",
    required: true,
  })
  @Type(() => DetailsContentDto)
  content: DetailsContentDto;
}
