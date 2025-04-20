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
import { ProgramStepActivityService } from "../service";
import { ProgramStepActivityEntity } from "../entity";
import { CreateProgramStepActivityDto, UpdateProgramStepActivityDto } from "../dto";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/activities")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityController {
  constructor(private readonly programStepActivityService: ProgramStepActivityService) {}

  @Post()
  @ApiOperation({ summary: "Create a new program step activity" })
  @ApiResponse({
    status: 201,
    description: "The program step activity has been successfully created.",
    type: ProgramStepActivityEntity,
  })
  create(@Body() createProgramStepActivityDto: CreateProgramStepActivityDto): Promise<ProgramStepActivityEntity> {
    return this.programStepActivityService.create(createProgramStepActivityDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all program step activities with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all program step activities with pagination.",
    type: [ProgramStepActivityEntity],
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<[ProgramStepActivityEntity[], number]> {
    return this.programStepActivityService.findAll(options);
  }

  @Get("search")
  @ApiOperation({ summary: "Search program step activities by name" })
  @ApiResponse({
    status: 200,
    description: "Return program step activities matching the search query.",
    type: [ProgramStepActivityEntity],
  })
  search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<[ProgramStepActivityEntity[], number]> {
    return this.programStepActivityService.search(query, options);
  }

  @Get("program-step/:programStepId")
  @ApiOperation({ summary: "Get all program step activities for a specific program step" })
  @ApiResponse({
    status: 200,
    description: "Return all program step activities for the specified program step.",
    type: [ProgramStepActivityEntity],
  })
  findByProgramStepId(
    @Param("programStepId", ParseIntPipe) programStepId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<[ProgramStepActivityEntity[], number]> {
    return this.programStepActivityService.findByProgramStepId(programStepId, options);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a program step activity by id" })
  @ApiResponse({
    status: 200,
    description: "Return the program step activity.",
    type: ProgramStepActivityEntity,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<ProgramStepActivityEntity> {
    return this.programStepActivityService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a program step activity" })
  @ApiResponse({
    status: 200,
    description: "The program step activity has been successfully updated.",
    type: ProgramStepActivityEntity,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramStepActivityDto: UpdateProgramStepActivityDto
  ): Promise<ProgramStepActivityEntity> {
    return this.programStepActivityService.update(id, updateProgramStepActivityDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a program step activity" })
  @ApiResponse({
    status: 200,
    description: "The program step activity has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programStepActivityService.remove(id);
  }
}
