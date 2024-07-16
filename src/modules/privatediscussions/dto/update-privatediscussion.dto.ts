import { IsOptional, IsString } from "class-validator";

export class UpdatePrivateDiscussionDto {
  @IsOptional()
  @IsString()
  message?: string;
}
