import { DetailsUserDto } from '@app/module/user/dto';


export class DetailsGymManagerFollowerDto {

  id: number;


  managerUserId: number;


  followerUserId: number;


  acceptedDate?: Date;


  stoppedDate?: Date;


  blockedDate?: Date;


  accepted?: boolean;


  blocked?: boolean;


  stopped?: boolean;


  manager: DetailsUserDto;


  follower: DetailsUserDto;


  createdAt: Date;


  updatedAt: Date;
}
