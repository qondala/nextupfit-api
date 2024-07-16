import { IsOptional, IsNumber } from "class-validator";

export class UpdateTrainingContentLinkDto {
  @IsOptional()
  @IsNumber()
  sessionId?: number;

  @IsOptional()
  @IsNumber()
  contentId?: number;
}
