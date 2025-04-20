import { PartialType } from '@nestjs/swagger';
import { CreateSocialChatMessageDto } from '../create';

export class UpdateSocialChatMessageDto extends PartialType(CreateSocialChatMessageDto) {}
