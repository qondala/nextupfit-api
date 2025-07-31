import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';


import { SwaggerType } from '@app/common/types';
import {
  JwtAuthGuard,
  RolesGuard
} from '@app/common/guards';


import { UserProgramAccessStatus } from '../../dto';
import { UserProgramAccessStatusService } from '../../service';



@ApiTags('User module endpoints')
@ApiBearerAuth()
@Controller('user/subscription/status/program')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserProgramAccessStatusController {

  constructor(private readonly service: UserProgramAccessStatusService) {}


  @Get(':userId/:programId')
  @ApiOperation({
    operationId: 'getUserProgramAccessStatus',
    summary: 'Get user program subscription status'
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiParam({
    name: 'programId',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserProgramAccessStatus
  })
  async getUserProgramAccessStatus(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('programId', ParseIntPipe) programId: number,
  ): Promise<UserProgramAccessStatus> {
    return this.service.getUserProgramAccessStatus(userId, programId);
  }

}
