import { IsString, IsOptional, IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSocialChatMessageDto {
  @ApiProperty({
    description: "Chat messag text",
    example: "Hi !",
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  chatId: number;


  @ApiProperty({
    description: "Chat message sender user id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  senderUserId: number;

  
  @ApiProperty({
    description: "auto=0 normal user sent message\nauto=1 missed audio call\nauto=2 missed video call\nauto=3 sender deleted message (last message text == null)",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  auto?: number;


  @ApiProperty({
    description: "Id of the message text",
    example: 2322332323345,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  messageTextId: number;


  @ApiProperty({
    description: "Date the chat message was sent",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsNumber()
  sentDate?: Date;
}
