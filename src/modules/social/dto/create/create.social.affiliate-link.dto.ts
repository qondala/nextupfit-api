import { IsOptional, IsNumber, IsNotEmpty, IsDate, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSocialAffiliateLinkDto {


  @ApiProperty({
    description: "Sample description of the affiliation program",
    example: "Sample generated link",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  generatedLink: string;


  @ApiProperty({
    description: "Id of the affiliate program",
    example: 556,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  affiliateProgramIdId: number;


  @ApiProperty({
    description: "Date this affialiate link was created",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdDate?: Date;


  @ApiProperty({
    description: "Owner user id of the affiliate program",
    example: 12345,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  ownerUserId: number;
}
