import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  PaginatedResponseDto,
  PaginationOptionsDto
} from "@app/common/dto";

import { ContentEntity } from "../entity";
import {
  CreateContentDto,
  UpdateContentDto,
  ContentFindCriteriaDto,
  ContentFindOrderEnum,
} from "../dto";

import {
  ContentComposite,
  ContentPrivacyEnum,
  ContentTypeEnum,
} from "../types";


import { ContentTextService } from "./content.text.service";
import { ContentTextareaService } from "./content.textarea.service";
import { ContentVideoService } from "./content.video.service";
import { ContentImageService } from "./content.image.service";
import { ContentAccordionService } from "./content.accordion.service";
import { ContentCarouselService } from "./content.carousel.service";
import { ContentCommitmentService } from "./content.commitment.service";
import { ContentWorkoutService } from "./content.workout.service";
import { ContentOrderedlistService } from "./content.orderedlist.service";
import { ContentUnorderedlistService } from "./content.unorderedlist.service";
import { ContentConsumptionService } from "./content.consumption.service";
import { ContentGoalsService } from "./content.goals.service";
import { ContentWarningService } from "./content.warning.service";
import { ContentTipsService } from "./content.tips.service";
import { ContentInstructionsService } from "./content.instructions.service";
import { ContentInformationService } from "./content.information.service";
import { ContentUsersupportService } from "./content.usersupport.service";
import { ContentFaqService } from "./content.faq.service";
import { ContentPrerequisitesService } from "./content.prerequisites.service";
import { ContentChallengesService } from "./content.challenges.service";
import { ContentEquipmentService } from "./content.equipment.service";
import { ContentSusbcriptionPlanService } from "./content.susbcription-plan.service";
import { ContentRecipeService } from "./content.recipe.service";
import { ContentGalleryService } from "./content.gallery.service";
import { ContentChatWithCoachService } from "./content.chatwithcoach.service";
import { SocialActorEnum } from "@app/module/social/types";


@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
    private readonly contentTextService: ContentTextService,
    private readonly contentTextareaService: ContentTextareaService,
    private readonly contentVideoService: ContentVideoService,
    private readonly contentImageService: ContentImageService,
    private readonly contentAccordionService: ContentAccordionService,
    private readonly contentCarouselService: ContentCarouselService,
    private readonly contentCommitmentService: ContentCommitmentService,
    private readonly contentWorkoutService: ContentWorkoutService,
    private readonly contentOrderedlistService: ContentOrderedlistService,
    private readonly contentUnorderedlistService: ContentUnorderedlistService,
    private readonly contentConsumptionService: ContentConsumptionService,
    private readonly contentGoalsService: ContentGoalsService,
    private readonly contentWarningService: ContentWarningService,
    private readonly contentTipsService: ContentTipsService,
    private readonly contentInstructionsService: ContentInstructionsService,
    private readonly contentInformationService: ContentInformationService,
    private readonly contentChatWithCoachService: ContentChatWithCoachService,
    private readonly contentUsersupportService: ContentUsersupportService,
    private readonly contentFaqService: ContentFaqService,
    private readonly contentPrerequisitesService: ContentPrerequisitesService,
    private readonly contentChallengesService: ContentChallengesService,
    private readonly contentEquipmentService: ContentEquipmentService,
    private readonly contentSubscriptionPlanService: ContentSusbcriptionPlanService,
    private readonly contentRecipeService: ContentRecipeService,
    private readonly contentGalleryService: ContentGalleryService,
  ) {}

  async create(createContentDto: CreateContentDto): Promise<ContentEntity> {
    const content = this.contentRepository.create(createContentDto);
    return await this.contentRepository.save(content);
  }



  async findAll(criteria: ContentFindCriteriaDto, options: PaginationOptionsDto): Promise<PaginatedResponseDto<ContentEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.contentRepository.createQueryBuilder("content");

    queryBuilder.where("content.id != 0");
    
    if (criteria.containerType) {
      queryBuilder.andWhere("content.containerType = :containerType", { containerType: criteria.containerType });
    }
    if (criteria.containerId) {
      queryBuilder.andWhere("content.containerId = :containerId", { containerId: criteria.containerId });
    }
    if (criteria.contentType) {
      queryBuilder.andWhere("content.contentType = :contentType", { contentType: criteria.contentType });
    }
    if (criteria.status) {
      queryBuilder.andWhere("content.status = :status", { status: criteria.status });
    }
    if (criteria.ownerUserId) {
      queryBuilder.andWhere("content.ownerUserId = :ownerUserId", { ownerUserId: criteria.ownerUserId });
    }
    if (criteria.ownerManagerId) {
      queryBuilder.andWhere("content.ownerManagerId = :ownerManagerId", { ownerManagerId: criteria.ownerManagerId });
    }
    if (criteria.ownerGymId) {
      queryBuilder.andWhere("content.ownerGymId = :ownerGymId", { ownerGymId: criteria.ownerGymId });
    }
    if (criteria.ownerType) {
      queryBuilder.andWhere("content.ownerType = :ownerType", { ownerType: criteria.ownerType });
    }

    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case ContentFindOrderEnum.position:
          queryBuilder.orderBy("content.contentPosition", "ASC");
          break;
        case ContentFindOrderEnum.date:
          queryBuilder.orderBy("content.createdAt", "DESC");
          break;
        case ContentFindOrderEnum.random:
          queryBuilder.orderBy("RANDOM()");
          break;
        case ContentFindOrderEnum.positionAndDate:
          queryBuilder.orderBy("content.contentPosition", "ASC")
          .addOrderBy("content.createdAt", "DESC");
          break;
      }
    }
    else {
      queryBuilder.orderBy("content.createdAt", "DESC");
    }

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    for (const item of items) {
      item.content = await this.getContentComposite(item.contentType, item.id);
    }

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }


  async findSocialActorContents(
    ownerSocialActorId: number,
    socialActorType: SocialActorEnum,
    publicMediaContentTypes: ContentTypeEnum[],
    contentPrivacies: ContentPrivacyEnum[],
    options: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<ContentEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.contentRepository.createQueryBuilder("content");

    if (socialActorType === SocialActorEnum.manager) {
      queryBuilder.where("content.ownerManagerId = :ownerManagerId", { ownerSocialActorId });
    }
    else if (socialActorType === SocialActorEnum.gym) {
      queryBuilder.where("content.ownerGymId = :ownerGymId", { ownerSocialActorId });
    }
    else if (socialActorType === SocialActorEnum.user) {
      queryBuilder.where("content.ownerUserId = :ownerUserId", { ownerSocialActorId });
    }

    queryBuilder.andWhere("content.contentType IN (:...contentTypes)", { contentTypes: publicMediaContentTypes });


    queryBuilder.andWhere("content.contentPrivacy IN (:...contentPrivacies)", { contentPrivacies });

    queryBuilder.andWhere("content.ownerType = :ownerType", { ownerType: socialActorType });

    queryBuilder.orderBy("content.createdAt", "DESC");

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    for (const item of items) {
      item.content = await this.getContentComposite(item.contentType, item.id);
    }

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }


  async findOne(id: number): Promise<ContentEntity> {
    const content = await this.contentRepository.findOne({ where: { id } });
    if (content) {
      content.content = await this.getContentComposite(content.contentType, content.id);
    }
    return content;
  }


  async getContentComposite(contentType: ContentTypeEnum, contentId: number): Promise<ContentComposite> {
    
    const composite = new ContentComposite();

    switch (contentType) {
      case ContentTypeEnum.text:
        composite.text = await this.contentTextService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.textarea:
        composite.textarea = await this.contentTextareaService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.video:
        composite.video = await this.contentVideoService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.image:
        composite.image = await this.contentImageService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.gallery:
        composite.gallery = await this.contentGalleryService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.accordion:
        composite.accordion = await this.contentAccordionService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.carousel:
        composite.carousel = await this.contentCarouselService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.commitment:
        composite.commitment = await this.contentCommitmentService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.workout:
        composite.workout = await this.contentWorkoutService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.orderedlist:
        composite.orderedlist = await this.contentOrderedlistService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.unorderedlist:
        composite.unorderedlist = await this.contentUnorderedlistService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.consumption:
        composite.consumption = await this.contentConsumptionService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.goals:
        composite.goals = await this.contentGoalsService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.warning:
        composite.warning = await this.contentWarningService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.tips:
        composite.tips = await this.contentTipsService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.instructions:
        composite.instructions = await this.contentInstructionsService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.information:
        composite.information = await this.contentInformationService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.chatwithcoach:
        composite.chatwithcoach = await this.contentChatWithCoachService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.usersupport:
        composite.usersupport = await this.contentUsersupportService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.faq:
        composite.faq = await this.contentFaqService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.prerequisites:
        composite.prerequisites = await this.contentPrerequisitesService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.challenges:
        composite.challenges = await this.contentChallengesService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.equipment:
        composite.equipment = await this.contentEquipmentService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.subscription_plan:
        composite.subscription_plan = await this.contentSubscriptionPlanService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.recipe:
        composite.recipe = await this.contentRecipeService.findOneWithContentId(contentId);
        break;
      case ContentTypeEnum.gallery:
        composite.gallery = await this.contentGalleryService.findOneWithContentId(contentId);
        break;
    }

    return composite;
  }


  async update(id: number, updateContentDto: UpdateContentDto): Promise<ContentEntity> {
    const content = await this.findOne(id);
    Object.assign(content, updateContentDto);
    return await this.contentRepository.save(content);
  }


  async remove(id: number): Promise<void> {
    await this.contentRepository.delete(id);
  }
}
