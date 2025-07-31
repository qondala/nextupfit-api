import { Injectable } from "@nestjs/common";

import { ProgramItemTypeEnum } from "@app/module/program/types";
import { ProgramStepService } from "@app/module/program/service";

import { ProgramNavigationReasonEnum } from "../../types";
import { ProgramNavigationNode } from "../../dto";


@Injectable()
export class NavigatorProgramService {
  constructor(
    private readonly programStepService: ProgramStepService,
  ) {}

  async next(current: ProgramNavigationNode): Promise<ProgramNavigationNode> {
    
    const next = {
      programItemType: ProgramItemTypeEnum.step,
      programItemId: null,
      userId: current.userId,
      title: null,
      description: null,
      icon: null,
      canNavigate: false,
      reasonCannotNavigate: current.reasonCannotNavigate,
    };

    if (!current.canNavigate) {
      return next;
    }

    const programStep = await this.programStepService.findFirst(current.programItemId);

    // If the program has no step
    if (!programStep) {
      next.reasonCannotNavigate = ProgramNavigationReasonEnum.programHasNoStep;
      return next;
    }

    next.programItemId = programStep.id;
    next.title = programStep.name;
    next.description = programStep.description;
    next.icon = programStep.iconUrl;
    next.canNavigate = true;
    next.reasonCannotNavigate = null;

    return next;
  }

  async previous(current: ProgramNavigationNode): Promise<ProgramNavigationNode> {
    return current;
  }
}
