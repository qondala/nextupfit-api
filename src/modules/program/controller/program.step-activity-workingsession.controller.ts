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
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  ProgramManagerService,
  ProgramStepActivityWorkingsessionService,
  ProgramPerSociologyService,
} from "../service";
import {
  CreateProgramStepActivityWorkingsessionDto,
  UpdateProgramStepActivityWorkingsessionDto,
  DetailsProgramStepActivityWorkingsessionDto,
  PaginatedDetailsProgramStepActivityWorkingsessionDto,
  ProgramFindCriteriaWorkingsessionDto,
} from "../dto";
import { ProgramItemTypeEnum } from "../types";
import { ProgramStepActivityWorkingsessionEntity } from "../entity";
import { SwaggerType } from "@app/common/types";

@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/step/activity/workingsessions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityWorkingsessionController {
  constructor(
    private readonly service: ProgramStepActivityWorkingsessionService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step activity workingsession",
    operationId: "createProgramStepActivityWorkingsession",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      "The program step activity workingsession has been successfully created.",
    type: DetailsProgramStepActivityWorkingsessionDto,
  })
  async create(
    @Body() body: CreateProgramStepActivityWorkingsessionDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    const record = await this.service.create(body);

    return {
      ...record,
      managers: [],
      audience: [],
    };
  }

  @Get()
  @ApiOperation({
    summary: "Get all program step activity workingsessions with pagination",
    operationId: "findAllProgramStepActivityWorkingsessions",
  })
  @ApiQuery({
    type: ProgramFindCriteriaWorkingsessionDto,
    required: false,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "Successfully retrieved program step activity workingsessions.",
    type: PaginatedDetailsProgramStepActivityWorkingsessionDto,
  })
  async findAll(
    @Query() criteria: ProgramFindCriteriaWorkingsessionDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramStepActivityWorkingsessionDto> {
    const result = await this.service.findAll(criteria, pagination);

    const details = await Promise.all(
      result.items.map(
        async (workingsession) =>
          await this.extractWorkingsessionDetails(workingsession),
      ),
    );

    return {
      meta: result.meta,
      items: details,
    };
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program step activity workingsession by ID",
    operationId: "findOneProgramStepActivityWorkingsession",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
    description:
      "The ID of the program step activity workingsession to retrieve.",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program step activity workingsession.",
    type: DetailsProgramStepActivityWorkingsessionDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    const record = await this.service.findOne(id);

    const details = await this.extractWorkingsessionDetails(record);

    return details;
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program step activity workingsession",
    operationId: "updateProgramStepActivityWorkingsession",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
    description:
      "The ID of the program step activity workingsession to delete.",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "The program step activity workingsession has been successfully updated.",
    type: DetailsProgramStepActivityWorkingsessionDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramStepActivityWorkingsessionDto,
  ): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    const record = await this.service.update(id, body);

    const details = await this.extractWorkingsessionDetails(record);

    return details;
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program step activity workingsession",
    operationId: "removeProgramStepActivityWorkingsession",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
    description:
      "The ID of the program step activity workingsession to delete.",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description:
      "The program step activity workingsession has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }

  /**
   * Extracts workingsession details including managers and audience.
   * @param workingsession - The workingsession entity to extract details from.
   * @returns A Promise that resolves to a DetailsProgramStepActivityWorkingsessionDto object containing the workingsession details.
   */
  private async extractWorkingsessionDetails(
    workingsession: ProgramStepActivityWorkingsessionEntity,
  ): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    const programCriteria = {
      itemId: workingsession.id,
      itemType: ProgramItemTypeEnum.workingsession,
    };

    const managersFound =
      await this.programManagerService.findAll(programCriteria);
    const audienceFound =
      await this.programPerSociologyService.findAll(programCriteria);

    return {
      ...workingsession,
      managers: managersFound.items.map(
        (programManager) => programManager.manager,
      ),
      audience: audienceFound.items.map(
        (programPerSociology) => programPerSociology.sociology,
      ),
    };
  }
}
