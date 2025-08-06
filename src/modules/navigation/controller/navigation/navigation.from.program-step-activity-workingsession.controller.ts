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
import { NavigationFromProgramStepActivityWorkingsessionService } from "../../service/navigation";

@ApiTags("Navigation module endpoints")
@ApiBearerAuth()
@Controller("navigation/program/step/activity/workingsession")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NavigationFromProgramStepActivityWorkingsessionController {
  constructor(
    private readonly service: NavigationFromProgramStepActivityWorkingsessionService,
  ) {}

  /**
   * Handle navigation to a program step activity workingsession
   *
   * @param parameters
   * @returns
   */
  @Get()
  @ApiOperation({
    operationId: "getProgramStepActivityWorkingsessionNextNavigation",
    summary: "Get program step activity workingsession next navigation",
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
