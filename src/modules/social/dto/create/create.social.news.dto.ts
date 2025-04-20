import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSocialNewsDto {
  @ApiProperty({
    description: "New post title",
    example: "Hello mate, sharing my journey and improvements with you.",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;


  @ApiProperty({
    description: "News post text",
    example: "Here you have the text describing the news post.",
    required: false,
  })
  @IsOptional()
  @IsString()
  text?: string;

 
  @ApiProperty({
    description: "User id author of the news post",
    example: 123344,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: "List of images/videos URLs to be included in the news post.",
    example: [],
    required: false,
  })
  @IsArray()
  mediaUrls?: string[];
}
