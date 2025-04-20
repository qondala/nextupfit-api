import { DetailsBaseWorkoutDto } from "@app/module/base/dto";
import { DetailsGymManagerDto } from "./";



export class DetailsGymManagerSpecializedInWorkoutDto {

  id: number;

  managerId: number;

  baseWorkoutId: number;


  createdAt: Date;

  updatedAt: Date;

  manager: DetailsGymManagerDto;

  baseWorkout: DetailsBaseWorkoutDto;
}
