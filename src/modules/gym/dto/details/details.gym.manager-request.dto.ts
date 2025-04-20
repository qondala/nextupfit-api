import { AutoSwagger } from '@app/common/decorators';

import { DetailsUserDto } from '@app/module/user/dto';



@AutoSwagger()
export class DetailsGymManagerRequestDto {

  id: number;


  gymId: number;


  applicantUserId: number;


  letter?: string;


  portfolioUrl?: string;


  documentUrl?: string;


  favorite?: boolean;


  accepted?: boolean;


  rejected?: boolean;


  acceptedDate?: Date;


  rejectedDate: Date;


  acceptedByGymManagerUserId: number;


  rejectedByGymManagerUserId: number;


  applicant: DetailsUserDto;


  createdAt: Date;


  updatedAt: Date;
}
