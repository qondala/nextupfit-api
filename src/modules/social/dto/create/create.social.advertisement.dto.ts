import { IsOptional, IsNumber, IsString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SocialAdvertisementActionEnum } from "../../types";

export class CreateSocialAdvertisementDto {

  @ApiProperty({
    description: "Video URL to be displayed",
    example: "Sample video URL",
    required: true,
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;


  @ApiProperty({
    description: "Image URL to be displayed",
    example: "Sample image URL",
    required: true,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;


  @ApiProperty({
    description: "What we do when a user clicks on the advertisement",
    example: SocialAdvertisementActionEnum.openGymPage,
    required: true,
  })
  @IsOptional()
  @IsEnum(SocialAdvertisementActionEnum)
  action?: SocialAdvertisementActionEnum;


  @ApiProperty({
    description: "URL of the web page to be opened when a user clicks on the advertisement",
    example: "Any web URL",
    required: true,
  })
  @IsOptional()
  @IsString()
  actionLink?: string;


  @ApiProperty({
    description: "Id of the program which's page will be opened when a user clicks on the advertisement",
    example: 45656,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  actionProgramId?: number;


  @ApiProperty({
    description: "Id of the gym which's page will be opened when a user clicks on the advertisement",
    example: 2323,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  actionGymId?: number;
}
