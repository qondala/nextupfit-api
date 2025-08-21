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
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  ProgramManagerService,
  ProgramStepActivityService,
  ProgramPerSociologyService,
} from "../service";
import {
  CreateProgramStepActivityDto,
  UpdateProgramStepActivityDto,
  PaginatedDetailsProgramStepActivityDto,
  DetailsProgramStepActivityDto,
  ProgramFindCriteriaActivityDto,
} from "../dto";
import { ProgramItemTypeEnum } from "../types";
import { ProgramStepActivityEntity } from "../entity";

@ApiTags("Program module endpoints")
@ApiBearerAuth()
@Controller("program/step/activity")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityController {
  constructor(
    private readonly service: ProgramStepActivityService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step activity",
    operationId: "createProgramStepActivity",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program step activity has been successfully created.",
    type: DetailsProgramStepActivityDto,
  })
  async create(
    @Body() createProgramStepActivityDto: CreateProgramStepActivityDto,
  ): Promise<DetailsProgramStepActivityDto> {
    const record = await this.service.create(createProgramStepActivityDto);

    return {
      ...record,
      managers: [],
      audience: [],
    };
  }

  @Get()
  @ApiOperation({
    summary: "Get all program step activities with pagination",
    operationId: "findAllProgramStepActivities",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all program step activities with pagination.",
    type: PaginatedDetailsProgramStepActivityDto,
  })
  async findAll(
    @Query() criteria: ProgramFindCriteriaActivityDto,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsProgramStepActivityDto> {
    const result = await this.service.findAll(criteria, pagination);

    const details = await Promise.all(
      result.items.map(
        async (activity) => await this.extractActivityDetails(activity),
      ),
    );

    return {
      meta: result.meta,
      items: details,
    };
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program step activity by id",
    operationId: "findOneProgramStepActivity",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program step activity.",
    type: DetailsProgramStepActivityDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramStepActivityDto> {
    const result = await this.service.findOne(id);

    const details = await this.extractActivityDetails(result);

    return details;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a program step activity by id",
    operationId: "findFlatOneProgramStepActivity",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the program step activity.",
    type: DetailsProgramStepActivityDto,
  })
  async findFlatOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsProgramStepActivityDto> {
    const result = await this.service.findFlatOne(id);
    return result;
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program step activity",
    operationId: "updateProgramStepActivity",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step activity has been successfully updated.",
    type: DetailsProgramStepActivityDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramStepActivityDto,
  ): Promise<DetailsProgramStepActivityDto> {
    const result = await this.service.update(id, body);

    const details = await this.extractActivityDetails(result);

    return details;
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program step activity",
    operationId: "deleteProgramStepActivity",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step activity has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }

  /**
   * Extracts activity details including managers and audience.
   * @param activity - The activity entity to extract details from.
   * @returns A Promise that resolves to a DetailsProgramStepActivityDto object containing the activity details.
   */
  private async extractActivityDetails(
    activity: ProgramStepActivityEntity,
  ): Promise<DetailsProgramStepActivityDto> {
    const programCriteria = {
      itemId: activity.id,
      itemType: ProgramItemTypeEnum.activity,
    };

    const managersFound =
      await this.programManagerService.findAll(programCriteria, { page: 1, limit: 99 });
    const audienceFound =
      await this.programPerSociologyService.findAll(programCriteria, { page: 1, limit: 99 });

    return {
      ...activity,
      managers: managersFound.items.map(
        (programManager) => programManager.manager,
      ),
      audience: audienceFound.items.map(
        (programPerSociology) => programPerSociology.sociology,
      ),
    };
  }
}
