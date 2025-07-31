import { Injectable } from "@nestjs/common";

import {
  ProgramItemTypeEnum,
} from "@app/module/program/types";
import {
  ProgramNavigationReasonEnum,
  ProgramNodeNavigationParams,
} from "../../types";
import {
  UserProgramNavigation,
} from "../../dto";
import {
  ProgramAccessRequirementsCheckerService,
  NavigatorProgramStepActivityWorkingsessionService
} from "..";



@Injectable()
export class NavigationFromProgramStepActivityWorkingsessionService {
  constructor(
    private readonly programAccessRequirementsCheckerService: ProgramAccessRequirementsCheckerService,
    private readonly navigatorProgramStepActivityWorkingsessionService: NavigatorProgramStepActivityWorkingsessionService,
  ) {}

  /**
   * Handle navigation to a program step activity
   * 
   * @param parameters
   * @returns
   */
  async navigate(
    parameters: ProgramNodeNavigationParams
  ): Promise<UserProgramNavigation> {

    // Calculate the current node
    const programAccessRequirementsCheckResult = await this.programAccessRequirementsCheckerService.check(parameters.id, parameters.userId);
    const userProgramNavigation: UserProgramNavigation = this.emptyNavigation(parameters.userId, parameters.id);
    if(!programAccessRequirementsCheckResult.ok) {
      userProgramNavigation.currentNavigation.canNavigate = false;
      userProgramNavigation.currentNavigation.reasonCannotNavigate = programAccessRequirementsCheckResult.reason;
    }

    // Calculate the next node
    if (programAccessRequirementsCheckResult.ok) {
      userProgramNavigation.nextNavigation = 
        await this.navigatorProgramStepActivityWorkingsessionService
          .next(userProgramNavigation.currentNavigation);
    }

    // Calculate the previous node
    userProgramNavigation.previousNavigation = 
      await this.navigatorProgramStepActivityWorkingsessionService
        .previous(userProgramNavigation.currentNavigation);

    return userProgramNavigation;
  }


  private emptyNavigation(userId: number, programItemId: number): UserProgramNavigation {
    return {
      // Current navigation
      currentNavigation: {
        programItemType: ProgramItemTypeEnum.workingsession,
        programItemId: programItemId,
        userId: userId,
        title: null,
        description: null,
        icon: null,
        canNavigate: false,
        reasonCannotNavigate: ProgramNavigationReasonEnum.resourceDoesNotExist,
      },
      // Previous navigation
      previousNavigation: {
        programItemType: ProgramItemTypeEnum.step,
        programItemId: null,
        userId: userId,
        title: null,
        description: null,
        icon: null,
        canNavigate: false,
        reasonCannotNavigate: ProgramNavigationReasonEnum.programHome,
      },
      // Next navigation
      nextNavigation: {
        programItemType: ProgramItemTypeEnum.workout,
        programItemId: null,
        userId: userId,
        title: null,
        description: null,
        icon: null,
        canNavigate: false,
        reasonCannotNavigate: ProgramNavigationReasonEnum.workingsessionNotYetStarted,
      },
    };
  }

}