import { Controller, Get, UseGuards, HttpStatus, Query } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";

import { ProgramNodeNavigationParams } from "../../types";
import { UserProgramNavigation } from "../../dto";
import { NavigationFromProgramStepActivityWorkingsessionWorkoutService } from "../../service/navigation";

@ApiTags("Navigation module endpoints")
@ApiBearerAuth()
@Controller("navigation/program/step/activity/workingsession/workout")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NavigationFromProgramStepActivityWorkingsessionWorkoutController {
  constructor(
    private readonly service: NavigationFromProgramStepActivityWorkingsessionWorkoutService,
  ) {}

  /**
   * Handle navigation to a program step activity workout
   *
   * @param parameters
   * @returns
   */
  @Get()
  @ApiOperation({
    operationId: "getProgramStepActivityWorkingsessionWorkoutNextNavigation",
    summary: "Get program step activity workingsession workout next navigation",
  })
  @ApiQuery({
    required: true,
    type: ProgramNodeNavigationParams,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserProgramNavigation,
  })
  async navigate(
    @Query() parameters: ProgramNodeNavigationParams,
  ): Promise<UserProgramNavigation> {
    return await this.service.navigate(parameters);
  }
}
