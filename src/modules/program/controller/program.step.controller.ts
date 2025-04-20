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
import { ProgramStepService } from "../service";
import { ProgramStepEntity } from "../entity";
import { CreateProgramStepDto, UpdateProgramStepDto } from "../dto";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("program/step")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepController {
  constructor(private readonly programStepService: ProgramStepService) {}

  @Post()
  @ApiOperation({ summary: "Create a new program step" })
  @ApiResponse({
    status: 201,
    description: "The program step has been successfully created.",
    type: ProgramStepEntity,
  })
  create(@Body() createProgramStepDto: CreateProgramStepDto): Promise<ProgramStepEntity> {
    return this.programStepService.create(createProgramStepDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all program steps with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all program steps with pagination.",
    type: [ProgramStepEntity],
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<[ProgramStepEntity[], number]> {
    return this.programStepService.findAll(options);
  }

  @Get("search")
  @ApiOperation({ summary: "Search program steps by name" })
  @ApiResponse({
    status: 200,
    description: "Return program steps matching the search query.",
    type: [ProgramStepEntity],
  })
  search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<[ProgramStepEntity[], number]> {
    return this.programStepService.search(query, options);
  }

  @Get("program/:programId")
  @ApiOperation({ summary: "Get all program steps for a specific program" })
  @ApiResponse({
    status: 200,
    description: "Return all program steps for the specified program.",
    type: [ProgramStepEntity],
  })
  findByProgramId(
    @Param("programId", ParseIntPipe) programId: number,
    @Query() options: PaginationOptionsDto
  ): Promise<[ProgramStepEntity[], number]> {
    return this.programStepService.findByProgramId(programId, options);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a program step by id" })
  @ApiResponse({
    status: 200,
    description: "Return the program step.",
    type: ProgramStepEntity,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<ProgramStepEntity> {
    return this.programStepService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a program step" })
  @ApiResponse({
    status: 200,
    description: "The program step has been successfully updated.",
    type: ProgramStepEntity,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramStepDto: UpdateProgramStepDto
  ): Promise<ProgramStepEntity> {
    return this.programStepService.update(id, updateProgramStepDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a program step" })
  @ApiResponse({
    status: 200,
    description: "The program step has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programStepService.remove(id);
  }
}
