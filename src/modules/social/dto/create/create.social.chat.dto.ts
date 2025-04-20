import { IsString, IsNumber, IsNotEmpty, IsDate, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSocialChatDto {

  @ApiProperty({
    description: "User id that initiates the conversation",
    example: 323454545,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  heyUserId: string;


  @ApiProperty({
    description: "User id that joins (eventually) the conversation",
    example: 1234345,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  hiUserId: string;


  @ApiProperty({
    description: "Date the conversation was initiated",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  dateStarted?: Date;
}
