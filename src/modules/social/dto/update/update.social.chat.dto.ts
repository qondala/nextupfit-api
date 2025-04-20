import { PartialType } from '@nestjs/swagger';
import { CreateSocialChatDto } from '../create';

export class UpdateSocialChatDto extends PartialType(CreateSocialChatDto) {}
