import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";

import { UserGymAccessStatus } from "../../dto";
import { UserGymAccessStatusService } from "../../service";

@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/subscription/status/gym")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserGymAccessStatusController {
  constructor(private readonly service: UserGymAccessStatusService) {}

  @Get(":userId/:gymId")
  @ApiOperation({
    operationId: "getUserGymAccessStatus",
    summary: "Get user gym access status",
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiParam({
    name: "gymId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserGymAccessStatus,
  })
  async getUserGymAccessStatus(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("gymId", ParseIntPipe) gymId: number,
  ): Promise<UserGymAccessStatus> {
    return this.service.getUserGymAccessStatus(userId, gymId);
  }
}
