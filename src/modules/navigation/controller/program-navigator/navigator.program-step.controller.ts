import { Controller, Get, UseGuards, HttpStatus, Query } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";

import { ProgramNavigationNode } from "../../dto";
import { NavigatorProgramStepService } from "../../service";

@ApiTags("Navigation module endpoints")
@ApiBearerAuth()
@Controller("navigation/navigator/program/step")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NavigatorProgramStepController {
  constructor(private readonly service: NavigatorProgramStepService) {}

  @Get("next")
  @ApiOperation({
    operationId: "getProgramStepNextNavigationNode",
    summary: "Get program step next navigation node",
  })
  @ApiQuery({
    required: true,
    type: ProgramNavigationNode,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProgramNavigationNode,
  })
  async next(
    @Query() current: ProgramNavigationNode,
  ): Promise<ProgramNavigationNode> {
    return await this.service.next(current);
  }

  @Get("previous")
  @ApiOperation({
    operationId: "getProgramStepPreviousNavigationNode",
    summary: "Get program step previous navigation node",
  })
  @ApiQuery({
    required: true,
    type: ProgramNavigationNode,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProgramNavigationNode,
  })
  async previous(
    @Query() current: ProgramNavigationNode,
  ): Promise<ProgramNavigationNode> {
    return await this.service.previous(current);
  }
}
