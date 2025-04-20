import { IsString, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSocialChatMessageTextDto {
  @ApiProperty({
    description: "Chat message text",
    example: "Hi !",
    required: false,
  })
  @IsOptional()
  @IsString()
  text?: string;


  @ApiProperty({
    description: "Date the chat message was sent",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsNumber()
  sentDate?: Date;
}
