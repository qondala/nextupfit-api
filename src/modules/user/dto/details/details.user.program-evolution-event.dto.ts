import { ProgamEvolutionEventTypeEnum, ProgramItemTypeEnum } from "@app/module/program/types";

export class DetailsUserProgramEvolutionEventDto {

  id: number;


  event: ProgamEvolutionEventTypeEnum;


  userId: number;


  gymId: number;


  programItemId: number;


  programItem: ProgramItemTypeEnum;


  subscriptionDate: Date;


  quantity: number;


  iteration: number;


  createdAt: Date;


  updatedAt: Date;
}

