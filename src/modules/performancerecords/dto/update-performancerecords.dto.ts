import { IsOptional, IsString, IsDate } from "class-validator";

export class UpdatePerformanceRecordDto {
  @IsOptional()
  @IsString()
  performanceDescription?: string;

  @IsOptional()
  @IsDate()
  dateRecorded?: Date;
}
