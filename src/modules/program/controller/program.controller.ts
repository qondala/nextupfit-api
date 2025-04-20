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
import { ProgramService } from "../service";
import { ProgramEntity } from "../entity";
import { CreateProgramDto, UpdateProgramDto } from "../dto";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("program/program")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @ApiOperation({ summary: "Create a new program" })
  @ApiResponse({
    status: 201,
    description: "The program has been successfully created.",
    type: ProgramEntity,
  })
  create(@Body() createProgramDto: CreateProgramDto): Promise<ProgramEntity> {
    return this.programService.create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all programs with pagination" })
  @ApiResponse({
    status: 200,
    description: "Return all programs with pagination.",
    type: [ProgramEntity],
  })
  findAll(@Query() options: PaginationOptionsDto): Promise<[ProgramEntity[], number]> {
    return this.programService.findAll(options);
  }

  @Get("search")
  @ApiOperation({ summary: "Search programs by name" })
  @ApiResponse({
    status: 200,
    description: "Return programs matching the search query.",
    type: [ProgramEntity],
  })
  search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<[ProgramEntity[], number]> {
    return this.programService.search(query, options);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a program by id" })
  @ApiResponse({
    status: 200,
    description: "Return the program.",
    type: ProgramEntity,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<ProgramEntity> {
    return this.programService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a program" })
  @ApiResponse({
    status: 200,
    description: "The program has been successfully updated.",
    type: ProgramEntity,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramDto: UpdateProgramDto
  ): Promise<ProgramEntity> {
    return this.programService.update(id, updateProgramDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a program" })
  @ApiResponse({
    status: 200,
    description: "The program has been successfully deleted.",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programService.remove(id);
  }
}
