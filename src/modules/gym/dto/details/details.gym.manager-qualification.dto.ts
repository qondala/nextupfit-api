import { AutoSwagger } from "@app/common/decorators";

import { DetailsGymManagerDto } from ".";


@AutoSwagger()
export class DetailsGymManagerQualificationDto {

  id: number;


  managerId: number;


  qualificationName: string;


  institutionName?: string;


  yearObtained?: number;


  certificateUrl?: string;


  isActive: boolean;


  createdAt: Date;

  
  manager: DetailsGymManagerDto;
}
