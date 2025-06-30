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

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ProgramSubscriptionPlanService } from "../service";
import {
  CreateProgramSubscriptionPlanDto,
  UpdateProgramSubscriptionPlanDto,
  DetailsProgramSubscriptionPlanDto,
  PaginatedDetailsProgramSubscriptionPlanDto
} from "../dto";

@ApiTags("Programs")
@ApiBearerAuth()
@Controller("program/subscription-plan")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramSubscriptionPlanController {
  constructor(private readonly programSubscriptionPlanService: ProgramSubscriptionPlanService) {}

  @Post()
  @ApiOperation({ summary: "Create a new program subscription plan" })
  @ApiResponse({
    status: 201,
    description: "The program subscription plan has been successfully created.",
    type: DetailsProgramSubscriptionPlanDto,
  })
  create(@Body() createProgramSubscriptionPlanDto: CreateProgramSubscriptionPlanDto): Promise<DetailsProgramSubscriptionPlanDto> {
    return this.programSubscriptionPlanService.create(createProgramSubscriptionPlanDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all program subscription plans with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all program subscription plans with pagination.",
    type: PaginatedDetailsProgramSubscriptionPlanDto,
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsProgramSubscriptionPlanDto> {
    return this.programSubscriptionPlanService.findAll(options);
  }

  @Get("search")
  @ApiOperation({ summary: "Search program subscription plans by name" })
  @ApiResponse({
    status: 200,
    description: "Return program subscription plans matching the search query.",
    type: PaginatedDetailsProgramSubscriptionPlanDto,
  })
  search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramSubscriptionPlanDto> {
    return this.programSubscriptionPlanService.search(query, options);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a program subscription plan by id" })
  @ApiResponse({
    status: 200,
    description: "Return the program subscription plan.",
    type: DetailsProgramSubscriptionPlanDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsProgramSubscriptionPlanDto> {
    return this.programSubscriptionPlanService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a program subscription plan" })
  @ApiResponse({
    status: 200,
    description: "The program subscription plan has been successfully updated.",
    type: DetailsProgramSubscriptionPlanDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramSubscriptionPlanDto: UpdateProgramSubscriptionPlanDto
  ): Promise<DetailsProgramSubscriptionPlanDto> {
    return this.programSubscriptionPlanService.update(id, updateProgramSubscriptionPlanDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a program subscription plan" })
  @ApiResponse({
    status: 200,
    description: "The program subscription plan has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programSubscriptionPlanService.remove(id);
  }
}
