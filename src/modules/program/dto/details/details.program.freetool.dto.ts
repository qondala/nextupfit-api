import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsGymDto, DetailsGymManagerDto } from "@app/module/gym/dto";

import { DetailsProgramFreetoolInterestDto } from "./details.program.freetool-interest.dto";

import { DetailsProgramStepActivityDto } from "./details.program.step-activity.dto";

export class DetailsProgramFreetoolDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "The unique identifier of the program freetool record",
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "The ID of the activity",
    example: 1,
  })
  activityId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "The ID of the manager",
    example: 1,
    nullable: true,
    required: false,
  })
  managerId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "The ID of the gym",
    example: 1,
    nullable: true,
    required: false,
  })
  gymId: number;

  @ApiProperty({
    type: SwaggerType.DATE,
    format: "date-time",
    description: "The creation timestamp",
    example: "2023-01-01T00:00:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: "Gym of the program freetool",
    required: false,
  })
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto;

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    title: "DetailsGymManagerDto",
    description: "Manager of the program freetool",
    required: false,
  })
  @Type(() => DetailsGymManagerDto)
  manager?: DetailsGymManagerDto;

  @ApiProperty({
    type: () => DetailsProgramStepActivityDto,
    title: "DetailsProgramStepActivityDto",
    description: "Program step activity of the freetool",
    required: true,
  })
  @Type(() => DetailsProgramStepActivityDto)
  activity: DetailsProgramStepActivityDto;

  @ApiProperty({
    type: () => DetailsProgramFreetoolInterestDto,
    isArray: true,
    title: "DetailsProgramFreetoolInterestDto",
    description: "Interests of the program freetool",
    required: false,
  })
  @Type(() => DetailsProgramFreetoolInterestDto)
  interests?: DetailsProgramFreetoolInterestDto[];
}
