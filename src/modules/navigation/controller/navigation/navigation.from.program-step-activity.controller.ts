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

import {
  ProgramNodeNavigationParams,
} from "../../types";
import {
  UserProgramNavigation,
} from "../../dto";
import {
  NavigationFromProgramStepActivityService
} from "../../service/navigation";


@ApiTags('Navigation module endpoints')
@ApiBearerAuth()
@Controller('navigation/program/step/activity')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NavigationFromProgramStepActivityController {
  constructor(
    private readonly service: NavigationFromProgramStepActivityService,
  ) {}

  /**
   * Handle navigation to a program step activity
   * 
   * @param parameters
   * @returns
   */
  @Get()
  @ApiOperation({
    operationId: 'getProgramStepActivityNextNavigation',
    summary: 'Get program step activity next navigation'
  })
  @ApiQuery({
    required: true,
    type: ProgramNodeNavigationParams
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserProgramNavigation
  })
  async navigate(
    @Query() parameters: ProgramNodeNavigationParams
  ): Promise<UserProgramNavigation> {
    return await this.service.navigate(parameters);
  }

}