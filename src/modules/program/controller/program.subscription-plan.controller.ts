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
  HttpStatus,
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
  CreateProgramSubscriptionPlanDto,
  UpdateProgramSubscriptionPlanDto,
  DetailsProgramSubscriptionPlanDto,
  PaginatedDetailsProgramSubscriptionPlanDto,
  ProgramFindCriteriaSubscriptionPlanDto,
} from "../dto";

import { ProgramSubscriptionPlanService } from "../service";

@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/subscription-plan")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramSubscriptionPlanController {
  constructor(private readonly service: ProgramSubscriptionPlanService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program subscription plan",
    operationId: "createProgramSubscriptionPlan",
  })
  @ApiBody({
    type: CreateProgramSubscriptionPlanDto,
    required: true,
    description: "Program subscription plan data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program subscription plan has been successfully created.",
    type: DetailsProgramSubscriptionPlanDto,
  })
  create(
    @Body() body: CreateProgramSubscriptionPlanDto,
  ): Promise<DetailsProgramSubscriptionPlanDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program subscription plans with pagination",
    operationId: "findAllProgramSubscriptionPlan",
  })
  @ApiQuery({
    description: "Program subscription plan criteria",
    required: false,
    type: ProgramFindCriteriaSubscriptionPlanDto,
  })
  @ApiQuery({
    description: "Pagination options",
    required: false,
    type: PaginationOptionsDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program subscription plans with pagination.",
    type: PaginatedDetailsProgramSubscriptionPlanDto,
  })
  findAll(
    @Query() criteria: ProgramFindCriteriaSubscriptionPlanDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramSubscriptionPlanDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program subscription plan by id",
    operationId: "findOneProgramSubscriptionPlan",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program subscription plan.",
    type: DetailsProgramSubscriptionPlanDto,
  })
  findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramSubscriptionPlanDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program subscription plan",
    operationId: "updateProgramSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    description: "Program subscription plan id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateProgramSubscriptionPlanDto,
    required: true,
    description: "Program subscription plan data",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program subscription plan has been successfully updated.",
    type: DetailsProgramSubscriptionPlanDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramSubscriptionPlanDto,
  ): Promise<DetailsProgramSubscriptionPlanDto> {
    return this.service.update(id, body);
  }

  @Patch(":id/activate")
  @ApiOperation({
    summary: "Activate a program subscription plan",
    operationId: "activateProgramSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    description: "Program subscription plan id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "The program subscription plan has been successfully activated.",
  })
  async activate(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.activate(id);
  }

  @Patch(":id/deactivate")
  @ApiOperation({
    summary: "Deactivate a program subscription plan",
    operationId: "deactivateProgramSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    description: "Program subscription plan id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description:
      "The program subscription plan has been successfully deactivated.",
  })
  async deactivate(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.deactivate(id);
    return;
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program subscription plan",
    operationId: "removeProgramSubscriptionPlan",
  })
  @ApiParam({
    name: "id",
    description: "Program subscription plan id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program subscription plan has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
    return;
  }
}
