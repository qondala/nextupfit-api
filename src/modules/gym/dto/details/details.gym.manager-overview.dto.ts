import { GymVerifiedStatusEnum } from "../../types";


export class DetailsGymManagerOverviewDto {
  
  id: number;


  managerUserId: number;


  bio?: string;


  text?: string;


  coverUrl?: string;


  address: string;
  

  email: string;


  facebookPageUrl?: string;


  twitterPageUrl?: string;


  linkedinPageUrl?: string;


  youtubePageUrl?: string;


  tiktokPageUrl?: string;


  phone?: string;


  followersCount?: number;


  stripeAccountId?: string;


  countryId?: number;


  stateId?: number;


  cityId: number;


  attendeesCount?: number;


  verifiedStatus: GymVerifiedStatusEnum


  createdDate: Date;


  experiences: string;
  

  viewsCount: number;


  ratingsAvg: number;


  ratingsCount: number;


  createdAt: Date;


  updatedAt: Date;
}
