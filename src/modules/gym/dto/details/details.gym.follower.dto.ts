import { DetailsUserDto } from "@app/module/user/dto";

import { DetailsGymDto } from "./";


export class DetailsGymFollowerDto {

  id: number;


  gymId: number;


  followerUserId: number;


  acceptedDate?: Date;
  
  
  stoppedDate?: Date;


  blockedDate?: Date;


  accepted?: boolean;


  blocked?: boolean;
  
  
  stopped?: boolean;


  gym: DetailsGymDto;


  follower: DetailsUserDto;


  createdAt: Date;


  updatedAt: Date;
}
