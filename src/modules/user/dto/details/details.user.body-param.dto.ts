import { AutoSwagger } from "@app/common/decorators";


@AutoSwagger()
export class DetailsUserBodyParamDto {

  id: number;


  userId: number;


  bodyParamId: number;


  paramValue: number;


  createdAt: Date;


  updatedAt: Date;
}
