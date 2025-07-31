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
  NavigationFromProgramStepService
} from "../../service/navigation";


@ApiTags('Navigation module endpoints')
@ApiBearerAuth()
@Controller('navigation/program/step')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NavigationFromProgramStepController {
  constructor(
    private readonly service: NavigationFromProgramStepService,
  ) {}

  /**
   * Handle navigation to a program step
   * 
   * @param parameters
   * @returns
   */
  @Get()
  @ApiOperation({
    operationId: 'getProgramStepNextNavigation',
    summary: 'Get program step next navigation'
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