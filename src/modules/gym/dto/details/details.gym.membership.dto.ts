import { AutoSwagger } from '@app/common/decorators';

import { DetailsUserDto } from '@app/module/user/dto';

import { DetailsGymDto, DetailsGymMembershipPlanDto} from '.';
import { GymMembershipStatusEnum } from '../../types';



@AutoSwagger()
export class DetailsGymMembershipDto {

  id: number;


  gymId: number;


  memberUserId: number;


  startedDate?: Date;


  membershipStatus: GymMembershipStatusEnum;


  stoppedDate?: Date;


  isFavorite?: boolean;


  suspendedDate: Date;


  membershipPlan: DetailsGymMembershipPlanDto;


  member: DetailsUserDto;

  gym: DetailsGymDto;


  createdAt: Date;


  updatedAt: Date;
}
