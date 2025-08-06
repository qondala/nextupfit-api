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
import { NavigatorProgramService } from "../../service";

@ApiTags("Navigation module endpoints")
@ApiBearerAuth()
@Controller("navigation/navigator/program")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NavigatorProgramController {
  constructor(private readonly service: NavigatorProgramService) {}

  @Get("next")
  @ApiOperation({
    operationId: "getProgramNextNavigationNode",
    summary: "Get program next navigation node",
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
    operationId: "getProgramPreviousNavigationNode",
    summary: "Get program previous navigation node",
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
