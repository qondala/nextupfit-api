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
  ApiNotFoundResponse
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  ProgramService,
  ProgramManagerService,
  ProgramPerSociologyService,
  ProgramSubscriptionPlanService
} from "../service";
import {
  CreateProgramDto,
  UpdateProgramDto,
  PaginatedDetailsProgramDto,
  DetailsProgramDto
} from "../dto";
import { ProgramItemTypeEnum } from "../types";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/program")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramController {
  constructor(
    private readonly programService: ProgramService,
    private readonly programManagerService: ProgramManagerService,
    private readonly programPerSociologyService: ProgramPerSociologyService,
    private readonly programSubscriptionPlanService: ProgramSubscriptionPlanService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program",
    operationId: "createProgram"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program has been successfully created.",
    type: DetailsProgramDto,
  })
  async create(@Body() createProgramDto: CreateProgramDto): Promise<DetailsProgramDto> {
    const record = await this.programService.create(createProgramDto);

    const details: DetailsProgramDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.program),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.program),
      subscriptionPlans: await this.programSubscriptionPlanService.fetchProgramSubscriptionPlans(record.id),
    };

    return details;
  }


  @Get()
  @ApiOperation({
    summary: "Get all programs with pagination",
    operationId: "findAllPrograms"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all programs with pagination.",
    type: PaginatedDetailsProgramDto,
  })
  async findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsProgramDto> {
    const result = await this.programService.findAll(options);

    const details: DetailsProgramDto[] = await Promise.all(result.items.map(async (program) => ({
      ...program,
      managers: await this.programManagerService.fetchProgramItemManagers(program.id, ProgramItemTypeEnum.program),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(program.id, ProgramItemTypeEnum.program),
      subscriptionPlans: await this.programSubscriptionPlanService.fetchProgramSubscriptionPlans(program.id),
    })));

    return {
      ...result,
      items: details
    };
  }

  @Get("search")
  @ApiOperation({
    summary: "Search programs by name",
    operationId: "searchPrograms"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return programs matching the search query.",
    type: PaginatedDetailsProgramDto,
  })
  async search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramDto> {
    const result = await this.programService.search(query, options);

    const details: DetailsProgramDto[] = await Promise.all(result.items.map(async (program) => ({
      ...program,
      managers: await this.programManagerService.fetchProgramItemManagers(program.id, ProgramItemTypeEnum.program),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(program.id, ProgramItemTypeEnum.program),
      subscriptionPlans: await this.programSubscriptionPlanService.fetchProgramSubscriptionPlans(program.id),
    })));

    return {
      ...result,
      items: details
    };
  }



  @Get(":id")
  @ApiOperation({
    summary: "Get a program by id",
    operationId: "findOneProgram"
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
    const program = await this.programService.findOne(id);
    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    const details: DetailsProgramDto = {
      ...program,
      managers: await this.programManagerService.fetchProgramItemManagers(program.id, ProgramItemTypeEnum.program),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(program.id, ProgramItemTypeEnum.program),
      subscriptionPlans: await this.programSubscriptionPlanService.fetchProgramSubscriptionPlans(program.id),
    };

    return details;
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a program",
    operationId: "updateProgram"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program has been successfully updated.",
    type: DetailsProgramDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramDto: UpdateProgramDto
  ): Promise<DetailsProgramDto> {
    const record = await this.programService.update(id, updateProgramDto);
    const details: DetailsProgramDto = {
      ...record,
      managers: await this.programManagerService.fetchProgramItemManagers(record.id, ProgramItemTypeEnum.program),
      audience: await this.programPerSociologyService.fetchProgramItemSociology(record.id, ProgramItemTypeEnum.program),
    };

    return details;
  }


  @Delete(":id")
  @ApiOperation({
    summary: "Delete a program",
    operationId: "removeProgram"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programService.remove(id);
  }
}
