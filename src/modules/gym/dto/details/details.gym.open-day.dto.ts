import { AutoSwagger } from "@app/common/decorators";
import { BaseWeekDaysEnum } from "@app/module/base/types";


@AutoSwagger()
export class DetailsGymOpenDayDto {

  id: number;


  gymId: number;


  day: BaseWeekDaysEnum;


  hourFrom: number;


  minuteFrom: number;


  hourTo: number;


  minuteTo: number;


  createdAt: Date;


  updatedAt: Date;
}
