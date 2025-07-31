import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';


import {
  JwtAuthGuard,
  RolesGuard
} from '@app/common/guards';

import { ProgramNavigationNode } from '../../dto';
import {
  NavigatorProgramStepActivityService
} from '../../service';


@ApiTags('Navigation module endpoints')
@ApiBearerAuth()
@Controller('navigation/navigator/program/step/activity')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NavigatorProgramStepActivityController {

  constructor(
    private readonly service: NavigatorProgramStepActivityService,
  ) {}


  @Get('next')
  @ApiOperation({
    operationId: 'getProgramStepActivityNextNavigationNode',
    summary: 'Get program step activity next navigation node'
  })
  @ApiQuery({
    required: true,
    type: ProgramNavigationNode
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProgramNavigationNode
  })
  async next(
    @Query() current: ProgramNavigationNode,
  ): Promise<ProgramNavigationNode> {
    return await this.service.next(current);
  }

  @Get('previous')
  @ApiOperation({
    operationId: 'getProgramStepActivityPreviousNavigationNode',
    summary: 'Get program step activity previous navigation node'
  })
  @ApiQuery({
    required: true,
    type: ProgramNavigationNode
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProgramNavigationNode
  })
  async previous(
    @Query() current: ProgramNavigationNode,
  ): Promise<ProgramNavigationNode> {
    return await this.service.previous(current);
  }

}
