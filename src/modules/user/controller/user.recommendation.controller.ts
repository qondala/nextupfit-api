import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

import { PaginationOptionsDto } from "@app/common/dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";


import {
  CreateUserRecommendationDto,
  DetailsUserRecommendationDto,
  UpdateUserRecommendationDto
} from "../dto";


import { UserRecommendationService } from "../service";


@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/recommendation")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserRecommendationController {
  constructor(private readonly userRecommendationService: UserRecommendationService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user recommendation" })
  @ApiResponse({
    status: 201,
    description: "The user recommendation has been successfully created.",
    type: DetailsUserRecommendationDto,
  })
  create(@Body() createUserRecommendationDto: CreateUserRecommendationDto): Promise<DetailsUserRecommendationDto> {
    return this.userRecommendationService.create(createUserRecommendationDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all user recommendations with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all user recommendations with pagination.",
    type: [DetailsUserRecommendationDto],
  })
  findAll(@Query() paginationDto: PaginationOptionsDto): Promise<[DetailsUserRecommendationDto[], number]> {
    return this.userRecommendationService.findAll(paginationDto);
  }

  @Get("recommender/:recommenderId")
  @ApiOperation({ summary: "Get all user recommendations made by a specific user" })
  @ApiResponse({
    status: 200,
    description: "Return all user recommendations made by the specified user.",
    type: [DetailsUserRecommendationDto],
  })
  findByRecommenderId(
    @Param("recommenderId", ParseIntPipe) recommenderId: number,
    @Query() paginationDto: PaginationOptionsDto
  ): Promise<[DetailsUserRecommendationDto[], number]> {
    return this.userRecommendationService.findByRecommenderId(recommenderId, paginationDto);
  }

  @Get("recommendee/:recommendeeId")
  @ApiOperation({ summary: "Get all user recommendations received by a specific user" })
  @ApiResponse({
    status: 200,
    description: "Return all user recommendations received by the specified user.",
    type: [DetailsUserRecommendationDto],
  })
  findByRecommendeeId(
    @Param("recommendeeId", ParseIntPipe) recommendeeId: number,
    @Query() paginationDto: PaginationOptionsDto
  ): Promise<[DetailsUserRecommendationDto[], number]> {
    return this.userRecommendationService.findByRecommendeeId(recommendeeId, paginationDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user recommendation by id" })
  @ApiResponse({
    status: 200,
    description: "Return the user recommendation.",
    type: DetailsUserRecommendationDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserRecommendationDto> {
    return this.userRecommendationService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user recommendation" })
  @ApiResponse({
    status: 200,
    description: "The user recommendation has been successfully updated.",
    type: DetailsUserRecommendationDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserRecommendationDto: UpdateUserRecommendationDto
  ): Promise<DetailsUserRecommendationDto> {
    return this.userRecommendationService.update(id, updateUserRecommendationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user recommendation" })
  @ApiResponse({
    status: 200,
    description: "The user recommendation has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userRecommendationService.remove(id);
  }
}
