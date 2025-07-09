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
  NotFoundException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiQuery
} from "@nestjs/swagger";

import {
  JwtAuthGuard,
  RolesGuard
} from "@app/common/guards";
import { SwaggerType } from "@app/common/types";
import { PaginationOptionsDto } from "@app/common/dto";


import { ProgramItemTypeEnum } from "../types";
import { ProgramEntity } from "../entity";
import {
  CreateProgramDto,
  UpdateProgramDto,
  PaginatedDetailsProgramDto,
  DetailsProgramDto,
  ProgramFindCriteriaDto,
} from "../dto";
import {
  ProgramService,
  ProgramManagerService,
  ProgramPerSociologyService,
  ProgramSubscriptionPlanService
} from "../service";


@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/program")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramController {
  constructor(
    private readonly service: ProgramService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
    private readonly programSubscriptionPlanService: ProgramSubscriptionPlanService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program",
    operationId: "createProgram"
  })
  @ApiBody({
    type: CreateProgramDto,
    required: true,
    description: "Program data",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program has been successfully created.",
    type: DetailsProgramDto,
  })
  async create(@Body() body: CreateProgramDto): Promise<DetailsProgramDto> {
    const record = await this.service.create(body);

    const details: DetailsProgramDto = {
      ...record,
      managers: [],
      audience: [],
      subscriptionPlans: [],
    };

    return details;
  }


  @Get()
  @ApiOperation({
    summary: "Get all programs with pagination",
    operationId: "findAllPrograms"
  })
  @ApiQuery({
    type: ProgramFindCriteriaDto,
    required: true,
    description: "Pagination options",
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: true,
    description: "Pagination options",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all programs with pagination.",
    type: PaginatedDetailsProgramDto,
  })
  async findAll(
    @Query() criteria: ProgramFindCriteriaDto,
    @Query() pagination: PaginationOptionsDto): Promise<PaginatedDetailsProgramDto> {
    const result = await this.service.findAll(criteria, pagination);

    const details = await Promise.all(result.items.map(async (program) => await this.extractProgramDetails(program)));

    return {
      meta: result.meta,
      items: details
    };
  }


  @Get(":id")
  @ApiOperation({
    summary: "Get a program by id",
    operationId: "findOneProgram"
  })
  @ApiParam({
    name: "id",
    description: "Program id",
    required: true,
    type: SwaggerType.INTEGER,
    example: 1234,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program.",
    type: DetailsProgramDto,
  })
  @ApiNotFoundResponse({
    description: "Program not found",
    type: NotFoundException,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsProgramDto> {
    const program = await this.service.findOne(id);
    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    const details = await this.extractProgramDetails(program);

    return details;
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program",
    operationId: "updateProgram"
  })
  @ApiParam({
    name: "id",
    description: "Program id",
    required: true,
    type: SwaggerType.INTEGER,
    example: 1234,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program has been successfully updated.",
    type: DetailsProgramDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramDto
  ): Promise<DetailsProgramDto> {
    const record = await this.service.update(id, body);
    const details = await this.extractProgramDetails(record);
    return details;
  }


  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program",
    operationId: "removeProgram"
  })
  @ApiParam({
    name: "id",
    description: "Program id",
    required: true,
    type: SwaggerType.INTEGER,
    example: 1234,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }

  /**
   * Extracts program details including managers, audience, and subscription plans.
   * @param program - The program entity to extract details from.
   * @returns A Promise that resolves to a DetailsProgramDto object containing the program details.
   */
  private async extractProgramDetails(program: ProgramEntity): Promise<DetailsProgramDto> {
    const programCriteria = {
      itemId: program.id,
      itemType: ProgramItemTypeEnum.program,
    };

    const subscriptionPlanCriteria = {
      programId: program.id,
    };

    const managersFound = await this.programManagerService.findAll(programCriteria);
    const audienceFound = await this.programPerSociologyService.findAll(programCriteria);
    const subscriptionPlansFound = await this.programSubscriptionPlanService.findAll(subscriptionPlanCriteria);


    return {
      ...program,
      managers: managersFound.items.map((programManager) => programManager.manager), 
      audience: audienceFound.items.map((programPerSociology) => programPerSociology.sociology),
      subscriptionPlans: subscriptionPlansFound.items
    };
  }
}

