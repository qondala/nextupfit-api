import {
  DetailsContentTextDto,
  DetailsContentTextareaDto,
  DetailsContentVideoDto,
  DetailsContentImageDto,
  DetailsContentAccordionDto,
  DetailsContentCarouselDto,
  DetailsContentCommitmentDto,
  DetailsContentWorkoutDto,
  DetailsContentOrderedlistDto,
  DetailsContentUnorderedlistDto,
  DetailsContentConsumptionDto,
  DetailsContentGoalsDto,
  DetailsContentWarningDto,
  DetailsContentTipsDto,
  DetailsContentInstructionsDto,
  DetailsContentInformationDto,
  DetailsContentChatWithCoachDto,
  DetailsContentUsersupportDto,
  DetailsContentFaqDto,
  DetailsContentPrerequisitesDto,
  DetailsContentChallengesDto,
  DetailsContentEquipmentDto,
  DetailsContentSusbcriptionPlanDto,
  DetailsContentRecipeDto,
  DetailsContentGalleryDto,
} from "../dto";

export class ContentComposite {
  text?: DetailsContentTextDto;
  textarea?: DetailsContentTextareaDto;
  video?: DetailsContentVideoDto;
  image?: DetailsContentImageDto;
  accordion?: DetailsContentAccordionDto;
  carousel?: DetailsContentCarouselDto;
  commitment?: DetailsContentCommitmentDto;
  workout?: DetailsContentWorkoutDto;
  orderedlist?: DetailsContentOrderedlistDto;
  unorderedlist?: DetailsContentUnorderedlistDto;
  consumption?: DetailsContentConsumptionDto;
  goals?: DetailsContentGoalsDto;
  warning?: DetailsContentWarningDto;
  tips?: DetailsContentTipsDto;
  instructions?: DetailsContentInstructionsDto;
  information?: DetailsContentInformationDto;
  chatwithcoach?: DetailsContentChatWithCoachDto;
  usersupport?: DetailsContentUsersupportDto;
  faq?: DetailsContentFaqDto;
  prerequisites?: DetailsContentPrerequisitesDto;
  challenges?: DetailsContentChallengesDto;
  equipment?: DetailsContentEquipmentDto;
  subscription_plan?: DetailsContentSusbcriptionPlanDto;
  recipe?: DetailsContentRecipeDto;
  gallery?: DetailsContentGalleryDto;
}
