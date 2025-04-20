import { GymManagerRoleEnum } from "../../types";
import {
  DetailsGymDto,
  DetailsGymManagerOverviewDto,
  DetailsGymManagerQualificationDto,
  DetailsGymManagerSpecializedInWorkoutDto
} from "./";



export class DetailsGymManagerDto {

  id: number;


  gymId: number;


  managerUserId: number;


  managerOverviewId?: number;


  role: GymManagerRoleEnum;


  dateEnrollment?: Date;


  suspended?: boolean;


  overview: DetailsGymManagerOverviewDto;


  gym: DetailsGymDto;

  
  qualifications: DetailsGymManagerQualificationDto[];


  specializedWorkouts: DetailsGymManagerSpecializedInWorkoutDto[];


  createdAt: Date;

  
  updatedAt: Date;
}
