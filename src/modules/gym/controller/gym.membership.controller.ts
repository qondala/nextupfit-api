import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
  ParseEnumPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateGymMembershipDto,
  UpdateGymMembershipDto,
  DetailsGymMembershipDto,
  PaginatedDetailsGymMembershipDto,
} from "../dto";
import { GymMembershipService } from "../service";
import { GymMembershipStatusEnum } from "../types";

@ApiTags("Gym module endpoints")
@ApiBearerAuth()
@Controller("gym/membership")
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymMembershipController {
  constructor(private readonly gymMembershipService: GymMembershipService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new gym membership",
    operationId: "createGymMembership",
  })
  @ApiBody({
    required: true,
    type: CreateGymMembershipDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Gym membership created successfully.",
    type: DetailsGymMembershipDto,
  })
  async create(
    @Body() createDto: CreateGymMembershipDto,
  ): Promise<DetailsGymMembershipDto> {
    return await this.gymMembershipService.create(createDto);
  }

  @Get("gym/:gymId")
  @ApiOperation({
    summary: "Get all memberships of a gym",
    operationId: "getGymMembershipsByGymId",
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
    description: "Paginated list of gym memberships by gym",
    type: PaginatedDetailsGymMembershipDto,
  })
  async getAllMembershipsOfGym(
    @Param("gymId", ParseIntPipe) gymId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymMembershipDto> {
    return await this.gymMembershipService.getAllMembershipsOfGym(
      gymId,
      pagination,
    );
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get all memberships of a user",
    operationId: "getGymMembershipsByUserId",
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
    description: "Paginated list of gym memberships by user",
    type: PaginatedDetailsGymMembershipDto,
  })
  async getAllUserGymMemberships(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymMembershipDto> {
    return await this.gymMembershipService.getAllUserGymMemberships(
      userId,
      pagination,
    );
  }

  @Get("user/:userId/gym/:gymId")
  @ApiOperation({
    summary: "Get all memberships of a user and gym",
    operationId: "getGymMembershipsByUserIdAndGymId",
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
    description: "Paginated list of gym memberships by user and gym",
    type: PaginatedDetailsGymMembershipDto,
  })
  async getAllUserAndGymMemberships(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("gymId", ParseIntPipe) gymId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsGymMembershipDto> {
    return await this.gymMembershipService.getAllUserAndGymMemberships(
      userId,
      gymId,
      pagination,
    );
  }

  @Get("user/:userId/gym/:gymId/plan/:gymMembershipPlanId")
  @ApiOperation({
    summary: "Get gym membership by user id, gym id and gym membership plan id",
    operationId: "getGymMembershipByUserIdAndGymIdAndGymMembershipPlanId",
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
  @ApiParam({
    name: "gymMembershipPlanId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym membership details",
    type: DetailsGymMembershipDto,
  })
  async getUserGymMembershipWithPlanId(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("gymId", ParseIntPipe) gymId: number,
    @Param("gymMembershipPlanId", ParseIntPipe) gymMembershipPlanId: number,
  ): Promise<DetailsGymMembershipDto> {
    return await this.gymMembershipService.getUserGymMembershipWithPlanId(
      userId,
      gymId,
      gymMembershipPlanId,
    );
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get gym membership by id",
    operationId: "getGymMembershipById",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gym membership details",
    type: DetailsGymMembershipDto,
  })
  async getMembershipById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsGymMembershipDto> {
    return await this.gymMembershipService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update gym membership",
    operationId: "updateGymMembership",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    required: true,
    type: UpdateGymMembershipDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated gym membership details",
    type: DetailsGymMembershipDto,
  })
  async updateMembershipById(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateGymMembershipDto,
  ): Promise<DetailsGymMembershipDto> {
    return await this.gymMembershipService.update(id, updateDto);
  }

  @Patch("user/:userId/gym/:gymId/plan/:gymMembershipPlanId/status/:status")
  @ApiOperation({
    summary: "Update gym membership status",
    operationId: "updateGymMembershipStatus",
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
  @ApiParam({
    name: "gymMembershipPlanId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiParam({
    name: "status",
    required: true,
    enum: GymMembershipStatusEnum,
    enumName: "GymMembershipStatusEnum",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated gym membership status",
  })
  async updateMembershipStatus(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("gymId", ParseIntPipe) gymId: number,
    @Param("gymMembershipPlanId", ParseIntPipe) gymMembershipPlanId: number,
    @Param("status", new ParseEnumPipe(GymMembershipStatusEnum))
    status: GymMembershipStatusEnum,
  ): Promise<void> {
    await this.gymMembershipService.updateGymMembershipStatusByPlanId(
      userId,
      gymId,
      gymMembershipPlanId,
      status,
    );
    return;
  }

  @Patch(":id/status/:status")
  @ApiOperation({
    summary: "Update gym membership status by id",
    operationId: "updateGymMembershipStatusById",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiParam({
    name: "status",
    required: true,
    enum: GymMembershipStatusEnum,
    enumName: "GymMembershipStatusEnum",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated gym membership status",
  })
  async updateGymMembershipStatusById(
    @Param("id", ParseIntPipe) id: number,
    @Param("status", new ParseEnumPipe(GymMembershipStatusEnum))
    status: GymMembershipStatusEnum,
  ): Promise<void> {
    await this.gymMembershipService.updateGymMembershipStatusById(id, status);
    return;
  }
}
