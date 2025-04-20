import { PartialType } from '@nestjs/swagger';
import { CreateSocialChatMessageTextDto } from '../create';

export class UpdateSocialChatMessageTextDto extends PartialType(CreateSocialChatMessageTextDto) {}
