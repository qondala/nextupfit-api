import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from "class-validator";

export class CreatePerformanceRecordDto {
  @IsNotEmpty()
  @IsNumber()
  userProgramId: number;

  @IsOptional()
  @IsString()
  performanceDescription?: string;

  @IsNotEmpty()
  @IsDate()
  dateRecorded: Date;
}
