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
  CreateProgramSubscriptionDto,
  UpdateProgramSubscriptionDto,
  DetailsProgramSubscriptionDto,
  ProgramFindCriteriaSubscriptionDto,
  PaginatedDetailsProgramSubscriptionDto,
} from "../dto";

import { ProgramSubscriptionService } from "../service";

@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/subscription")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramSubscriptionController {
  constructor(private readonly service: ProgramSubscriptionService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program subscription",
    operationId: "createProgramSubscription",
  })
  @ApiBody({
    type: CreateProgramSubscriptionDto,
    required: true,
    description: "Program subscription data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program subscription has been successfully created.",
    type: DetailsProgramSubscriptionDto,
  })
  create(
    @Body() body: CreateProgramSubscriptionDto,
  ): Promise<DetailsProgramSubscriptionDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program subscriptions with pagination",
    operationId: "findAllProgramSubscription",
  })
  @ApiQuery({
    description: "Program subscription find criteria",
    required: false,
    type: ProgramFindCriteriaSubscriptionDto,
  })
  @ApiQuery({
    description: "Pagination options",
    required: false,
    type: PaginationOptionsDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program subscriptions with pagination.",
    type: PaginatedDetailsProgramSubscriptionDto,
  })
  findAll(
    @Query() criteria: ProgramFindCriteriaSubscriptionDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramSubscriptionDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program subscription by id",
    operationId: "findOneProgramSubscription",
  })
  @ApiParam({
    name: "id",
    description: "Program subscription ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program subscription.",
    type: DetailsProgramSubscriptionDto,
  })
  findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramSubscriptionDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program subscription",
    operationId: "updateProgramSubscription",
  })
  @ApiParam({
    name: "id",
    description: "Program subscription ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateProgramSubscriptionDto,
    required: true,
    description: "Program subscription data",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program subscription has been successfully updated.",
    type: DetailsProgramSubscriptionDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramSubscriptionDto,
  ): Promise<DetailsProgramSubscriptionDto> {
    return this.service.update(id, body);
  }

  @Patch(":id/activate")
  @ApiOperation({
    summary: "Activate a program subscription",
    operationId: "activateProgramSubscription",
  })
  @ApiParam({
    name: "id",
    description: "Program subscription ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program subscription has been successfully activated.",
  })
  async activate(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.activate(id);
  }

  @Patch(":id/deactivate")
  @ApiOperation({
    summary: "Deactivate a program subscription",
    operationId: "deactivateProgramSubscription",
  })
  @ApiParam({
    name: "id",
    description: "Program subscription ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program subscription has been successfully deactivated.",
  })
  async deactivate(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.deactivate(id);
    return;
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program subscription",
    operationId: "removeProgramSubscription",
  })
  @ApiParam({
    name: "id",
    description: "Program subscription ID",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program subscription has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
    return;
  }
}
