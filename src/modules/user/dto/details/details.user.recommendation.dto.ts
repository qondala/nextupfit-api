import { AutoSwagger } from "@app/common/decorators";


@AutoSwagger()
export class DetailsUserRecommendationDto {

  id: number;


  recommendedManagerUserId: number;


  recommenderUserId: number;


  recommendeeUserId: number;


  createdAt: Date;


  updatedAt: Date;
}
