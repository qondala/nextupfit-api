import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, MoreThan, Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  ProgramEvolutionEventTypeEnum,
  ProgramItemCompositeDto,
  ProgramItemTypeEnum,
} from "@app/module/program/types";
import { SocialActorEnum } from "@app/module/social/types";

import {
  ProgramStepActivityWorkingsessionPracticeEntity,
  ProgramStepEntity,
  ProgramStepActivityEntity,
  ProgramStepActivityWorkingsessionEntity,
  ProgramEntity,
} from "@app/module/program/entity";

import { UserProgramEvolutionEntity } from "../entity";
import {
  CreateUserProgramEvolutionEventDto,
  UpdateUserProgramEvolutionDto,
} from "../dto";

@Injectable()
export class UserProgramEvolutionService {
  constructor(
    @InjectRepository(UserProgramEvolutionEntity)
    private readonly userProgramEvolutionRepository: Repository<UserProgramEvolutionEntity>,
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
    @InjectRepository(ProgramStepEntity)
    private readonly programStepRepository: Repository<ProgramStepEntity>,
    @InjectRepository(ProgramStepActivityEntity)
    private readonly programStepActivityRepository: Repository<ProgramStepActivityEntity>,
    @InjectRepository(ProgramStepActivityWorkingsessionEntity)
    private readonly programStepActivityWorkingsessionRepository: Repository<ProgramStepActivityWorkingsessionEntity>,
    @InjectRepository(ProgramStepActivityWorkingsessionPracticeEntity)
    private readonly practiceRepository: Repository<ProgramStepActivityWorkingsessionPracticeEntity>,
  ) {}

  async create(
    createUserProgramEvolutionDto: CreateUserProgramEvolutionEventDto,
  ): Promise<UserProgramEvolutionEntity> {
    const userProgramEvolution = this.userProgramEvolutionRepository.create(
      createUserProgramEvolutionDto,
    );
    return await this.userProgramEvolutionRepository.save(userProgramEvolution);
  }

  async findOne(id: number): Promise<UserProgramEvolutionEntity> {
    const userProgramEvolution =
      await this.userProgramEvolutionRepository.findOne({ where: { id } });
    return userProgramEvolution;
  }

  async update(
    id: number,
    updateUserProgramEvolutionDto: UpdateUserProgramEvolutionDto,
  ): Promise<UserProgramEvolutionEntity> {
    const userProgramEvolution = await this.findOne(id);
    Object.assign(userProgramEvolution, updateUserProgramEvolutionDto);
    return await this.userProgramEvolutionRepository.save(userProgramEvolution);
  }

  async remove(id: number): Promise<void> {
    const userProgramEvolution = await this.findOne(id);
    await this.userProgramEvolutionRepository.remove(userProgramEvolution);
  }

  async getNumberOfUserActivityEventsDoneSince(
    userId: number,
    gymId: number,
    activityId: number,
    date: Date,
  ): Promise<number> {
    return await this.userProgramEvolutionRepository.count({
      where: {
        userId,
        gymId,
        programItemId: activityId,
        programItem: ProgramItemTypeEnum.activity,
        event: ProgramEvolutionEventTypeEnum.done,
        createdAt: MoreThan(date),
      },
    });
  }

  async didUserEverStartedOrCompleted(
    userId: number,
    programItemId: number,
    eventType: ProgramItemTypeEnum,
  ): Promise<boolean> {
    return (
      (await this.userProgramEvolutionRepository.findOne({
        where: {
          userId,
          programItemId,
          programItem: eventType,
          event: In([
            ProgramEvolutionEventTypeEnum.done,
            ProgramEvolutionEventTypeEnum.started,
          ]),
        },
      })) !== null
    );
  }

  async getUserProgression(
    userId: number,
    programItemId: number,
    programItem: ProgramItemTypeEnum,
  ): Promise<UserProgramEvolutionEntity> {
    const userProgramEvolution =
      await this.userProgramEvolutionRepository.findOne({
        where: { userId, programItemId, programItem },
        order: {
          createdAt: "DESC",
        },
      });

    return userProgramEvolution;
  }

  /**
   * Find user program steps
   * @param userId
   * @param programId
   * @param type
   * @param options
   * @returns
   */
  async findUserProgramStepsEvents(
    userId: number,
    programId: number,
    type: ProgramEvolutionEventTypeEnum,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserProgramEvolutionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const programSteps = await this.programStepRepository.find({
      where: { programId },
    });

    const programStepIds = programSteps.map((step) => step.id);

    const [items, total] =
      await this.userProgramEvolutionRepository.findAndCount({
        where: {
          userId,
          programItem: ProgramItemTypeEnum.step,
          receiverType: SocialActorEnum.user,
          programItemId: In(programStepIds),
          event: type,
        },
        skip,
        take: limit,
        order: {
          createdAt: "DESC",
        },
      });

    for (const item of items) {
      item.programItemComposite = await this.getProgramItemComposite(
        item.programItemId,
        item.programItem,
      );
    }

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  /**
   * Find user program activities
   * @param userId
   * @param programId
   * @param type
   * @param options
   * @returns
   */
  async findUserProgramStepActivitiesEvents(
    userId: number,
    programStepId: number,
    type: ProgramEvolutionEventTypeEnum,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserProgramEvolutionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const stepActivities = await this.programStepActivityRepository.find({
      where: { programStepId },
    });

    const stepActivityIds = stepActivities.map((activity) => activity.id);

    const [items, total] =
      await this.userProgramEvolutionRepository.findAndCount({
        where: {
          userId,
          programItem: ProgramItemTypeEnum.activity,
          receiverType: SocialActorEnum.user,
          programItemId: In(stepActivityIds),
          event: type,
        },
        skip,
        take: limit,
        order: {
          createdAt: "DESC",
        },
      });

    for (const item of items) {
      item.programItemComposite = await this.getProgramItemComposite(
        item.programItemId,
        item.programItem,
      );
    }

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  /**
   * Find user program step activity workingsession
   * @param userId
   * @param programStepActivityId
   * @param type
   * @param options
   * @returns
   */
  async findUserProgramStepActivityWorkingsessionsEvents(
    userId: number,
    programStepActivityId: number,
    type: ProgramEvolutionEventTypeEnum,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserProgramEvolutionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const stepActivityWorkingsession =
      await this.programStepActivityWorkingsessionRepository.find({
        where: { programStepActivityId },
      });

    const stepActivityWorkingsessionIds = stepActivityWorkingsession.map(
      (workingsession) => workingsession.id,
    );

    const [items, total] =
      await this.userProgramEvolutionRepository.findAndCount({
        where: {
          userId,
          programItem: ProgramItemTypeEnum.activity,
          receiverType: SocialActorEnum.user,
          programItemId: In(stepActivityWorkingsessionIds),
          event: type,
        },
        skip,
        take: limit,
        order: {
          createdAt: "DESC",
        },
      });

    for (const item of items) {
      item.programItemComposite = await this.getProgramItemComposite(
        item.programItemId,
        item.programItem,
      );
    }

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  /**
   * Find user program step activity workingsession practices
   * @param userId
   * @param workingSessionId
   * @param type
   * @param options
   * @returns
   */
  async findUserProgramStepActivityWorkingsessionPracticesEvents(
    userId: number,
    workingSessionId: number,
    type: ProgramEvolutionEventTypeEnum,
    options: PaginationOptionsDto,
  ): Promise<PaginatedResponseDto<UserProgramEvolutionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const workingsessionPractices = await this.practiceRepository.find({
      where: { workingSessionId },
    });

    const workingsessionPracticeIds = workingsessionPractices.map(
      (practice) => practice.id,
    );

    const [items, total] =
      await this.userProgramEvolutionRepository.findAndCount({
        where: {
          userId,
          programItem: ProgramItemTypeEnum.activity,
          receiverType: SocialActorEnum.user,
          programItemId: In(workingsessionPracticeIds),
          event: type,
        },
        skip,
        take: limit,
        order: {
          createdAt: "DESC",
        },
      });

    for (const item of items) {
      item.programItemComposite = await this.getProgramItemComposite(
        item.programItemId,
        item.programItem,
      );
    }

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async getProgramItemComposite(
    programItemId: number,
    programItem: ProgramItemTypeEnum,
  ): Promise<ProgramItemCompositeDto> {
    const programItemComposite = new ProgramItemCompositeDto();

    switch (programItem) {
      case ProgramItemTypeEnum.program:
        const program = await this.programRepository.findOne({
          where: { id: programItemId },
        });
        programItemComposite.program = program;
        break;
      case ProgramItemTypeEnum.step:
        const programStep = await this.programStepRepository.findOne({
          where: { id: programItemId },
        });
        programItemComposite.step = programStep;
        break;
      case ProgramItemTypeEnum.activity:
        const programActivity =
          await this.programStepActivityRepository.findOne({
            where: { id: programItemId },
          });
        programItemComposite.activity = programActivity;
        break;
      case ProgramItemTypeEnum.workingsession:
        const programWorkingsession =
          await this.programStepActivityWorkingsessionRepository.findOne({
            where: { id: programItemId },
          });
        programItemComposite.workingsession = programWorkingsession;
        break;
      case ProgramItemTypeEnum.practice:
        const programPractice = await this.practiceRepository.findOne({
          where: { id: programItemId },
          relations: ["workout", "nutrition"],
        });
        programItemComposite.practice = programPractice;
        break;
    }

    return programItemComposite;
  }
}
