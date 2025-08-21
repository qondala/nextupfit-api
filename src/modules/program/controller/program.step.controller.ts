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
  ApiParam,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  ProgramManagerService,
  ProgramStepService,
  ProgramPerSociologyService,
} from "../service";

import {
  CreateProgramStepDto,
  UpdateProgramStepDto,
  PaginatedDetailsProgramStepDto,
  DetailsProgramStepDto,
  ProgramFindCriteriaStepDto,
} from "../dto";
import { ProgramItemTypeEnum } from "../types";
import { ProgramStepEntity } from "../entity";

@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/step")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepController {
  constructor(
    private readonly service: ProgramStepService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step",
    operationId: "createProgramStep",
  })
  @ApiBody({
    type: CreateProgramStepDto,
    description: "Fields required to create a new program step",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program step has been successfully created.",
    type: DetailsProgramStepDto,
  })
  async create(
    @Body() body: CreateProgramStepDto,
  ): Promise<DetailsProgramStepDto> {
    const record = await this.service.create(body);

    const details: DetailsProgramStepDto = {
      ...record,
      managers: [],
      audience: [],
    };

    return details;
  }

  @Get()
  @ApiOperation({
    summary: "Get all program steps with pagination",
    operationId: "findAllProgramSteps",
  })
  @ApiQuery({
    type: ProgramFindCriteriaStepDto,
    description: "Criteria to filter program steps",
    required: false,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program steps with pagination.",
    type: PaginatedDetailsProgramStepDto,
  })
  async findAll(
    @Query() criteria: ProgramFindCriteriaStepDto,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramStepDto> {
    const result = await this.service.findAll(criteria, pagination);

    const details = await Promise.all(
      result.items.map(async (step) => await this.extractStepDetails(step)),
    );

    return {
      meta: result.meta,
      items: details,
    };
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program step by id",
    operationId: "findOneProgramStep",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program step.",
    type: DetailsProgramStepDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramStepDto> {
    const result = await this.service.findOne(id);

    const details = await this.extractStepDetails(result);

    return details;
  }

  @Get("flat/:id")
  @ApiOperation({
    summary: "Get a program step by id",
    operationId: "findFlatOneProgramStep",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program step.",
    type: DetailsProgramStepDto,
  })
  async findFlatOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramStepDto> {
    const result = await this.service.findFlatOne(id);
    return result;
  }


  @Patch(":id")
  @ApiOperation({
    summary: "Update a program step",
    operationId: "updateProgramStep",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    required: true,
  })
  @ApiBody({
    type: UpdateProgramStepDto,
    description: "Fields required to update a program step",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step has been successfully updated.",
    type: DetailsProgramStepDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramStepDto,
  ): Promise<DetailsProgramStepDto> {
    const result = await this.service.update(id, body);

    const details = await this.extractStepDetails(result);

    return details;
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program step",
    operationId: "removeProgramStep",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }

  /**
   * Extracts step details including managers and audience.
   * @param step - The step entity to extract details from.
   * @returns A Promise that resolves to a DetailsProgramStepDto object containing the step details.
   */
  private async extractStepDetails(
    step: ProgramStepEntity,
  ): Promise<DetailsProgramStepDto> {
    const programCriteria = {
      itemId: step.id,
      itemType: ProgramItemTypeEnum.step,
    };

    const managersFound =
      await this.programManagerService.findAll(programCriteria, { page: 1, limit: 99 });
    const audienceFound =
      await this.programPerSociologyService.findAll(programCriteria, { page: 1, limit: 99 });

    return {
      ...step,
      managers: managersFound.items.map(
        (programManager) => programManager.manager,
      ),
      audience: audienceFound.items.map(
        (programPerSociology) => programPerSociology.sociology,
      ),
    };
  }
}
