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
  NavigationFromProgramService
} from "../../service/navigation";


@ApiTags('Navigation module endpoints')
@ApiBearerAuth()
@Controller('navigation/program')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NavigationFromProgramController {
  constructor(
    private readonly service: NavigationFromProgramService,
  ) {}

  /**
   * Handle navigation to a program
   * 
   * @param parameters
   * @returns
   */
  @Get()
  @ApiOperation({
    operationId: 'getProgramNextNavigation',
    summary: 'Get program next navigation'
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