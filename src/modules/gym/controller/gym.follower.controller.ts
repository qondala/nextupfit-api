import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateGymFollowerDto,
  DetailsGymFollowerDto,
  PaginatedDetailsGymFollowerDto,
} from "../dto";
import { GymFollowerService } from "../service";
import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode,
} from "@app/common/exceptions";
import { SwaggerType } from "@app/common/types";

@ApiTags("Gym module endpoints")
@ApiBearerAuth()
@Controller("gym/follower")
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymFollowerController {
  constructor(private readonly gymFollowerService: GymFollowerService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new gym follower",
    operationId: "createGymFollower",
  })
  @ApiBody({
    type: CreateGymFollowerDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Gym follower created successfully.",
    type: DetailsGymFollowerDto,
  })
  async create(@Body() createDto: CreateGymFollowerDto) {
    return await this.gymFollowerService.create(createDto);
  }

  @Get("gym/:gymId")
  @ApiOperation({
    summary: "Get all followers of a gym",
    operationId: "getAllFollowersOfGym",
  })
  @ApiParam({
    name: "gymId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of gym followers",
    type: PaginatedDetailsGymFollowerDto,
  })
  async findAllFollowersOfGym(
    @Param("gymId", ParseIntPipe) gymId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymFollowerDto> {
    return this.gymFollowerService.findAllFollowersOfGym(
      gymId,
      paginationOptions,
    );
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get all gyms followed by a user",
    operationId: "getAllGymsFollowedByUser",
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of followed gyms",
    type: PaginatedDetailsGymFollowerDto,
  })
  async findAllGymsFollowedByUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymFollowerDto> {
    return this.gymFollowerService.findAllGymsFollowedByUser(
      userId,
      paginationOptions,
    );
  }

  @Get("is-following/user/:userId/gym/:gymId")
  @ApiOperation({
    summary: "Check if a user is following a gym",
    operationId: "isFollowingGym",
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
    description: "User is following gym",
    type: DetailsGymFollowerDto,
  })
  async isFollowingGym(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("gymId", ParseIntPipe) gymId: number,
  ): Promise<DetailsGymFollowerDto> {
    return this.gymFollowerService.isFollowing(userId, gymId);
  }

  @Patch("accept-follower/gym/:gymId/user/:userId")
  @ApiOperation({
    summary: "Accept a follower",
    operationId: "acceptFollower",
  })
  @ApiParam({
    name: "gymId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Stop following gym",
  })
  async acceptFollower(
    @Param("gymId", ParseIntPipe) gymId: number,
    @Param("userId", ParseIntPipe) userId: number,
  ) {
    await this.gymFollowerService.acceptFollower(gymId, userId);
    return;
  }

  @Patch("reject-follower/gym/:gymId/user/:userId")
  @ApiOperation({
    summary: "Reject a follower",
    operationId: "rejectFollower",
  })
  @ApiParam({
    name: "gymId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Stop following gym",
  })
  async rejectFollower(
    @Param("gymId", ParseIntPipe) gymId: number,
    @Param("userId", ParseIntPipe) userId: number,
  ) {
    await this.gymFollowerService.rejectFollower(gymId, userId);
    return;
  }

  @Patch("stop-following/user/:userId/gym/:gymId")
  @ApiOperation({
    summary: "Stop following a gym",
    operationId: "stopFollowing",
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
    description: "Stop following gym",
  })
  async stopFollowing(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("gymId", ParseIntPipe) gymId: number,
  ) {
    await this.gymFollowerService.stopFollowing(userId, gymId);
    return;
  }

  @Patch("block-follower/gym/:gymId/user/:userId")
  @ApiOperation({
    summary: "Block a follower",
    operationId: "blockFollower",
  })
  @ApiParam({
    name: "gymId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Stop following gym",
  })
  async blockFollower(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("gymId", ParseIntPipe) gymId: number,
  ) {
    await this.gymFollowerService.blockFollower(gymId, userId);
    return;
  }

  @Patch("unblock-follower/gym/:gymId/user/:userId")
  @ApiOperation({
    summary: "Unblock a follower",
    operationId: "unblockFollower",
  })
  @ApiParam({
    name: "gymId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Stop following gym",
  })
  async unblockFollower(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("gymId", ParseIntPipe) gymId: number,
  ) {
    await this.gymFollowerService.unblockFollower(gymId, userId);
    return;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get gym follower by id",
    operationId: "findOne",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym follower details",
    type: DetailsGymFollowerDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Gym follower not found",
    type: ErrorResponseException,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsGymFollowerDto> {
    const record = this.gymFollowerService.findOne(id);
    if (!record) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.DATABASE,
        `Gym follower with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.NOT_FOUND,
      );
    }
    return record;
  }
}
