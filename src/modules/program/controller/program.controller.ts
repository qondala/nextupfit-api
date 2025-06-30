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

import { ProgramService } from "../service";
import {
  CreateProgramDto,
  UpdateProgramDto,
  PaginatedDetailsProgramDto,
  DetailsProgramDto
} from "../dto";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/program")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

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
  create(@Body() createProgramDto: CreateProgramDto): Promise<DetailsProgramDto> {
    return this.programService.create(createProgramDto);
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
  findAll(@Query() options: PaginationOptionsDto): Promise<PaginatedDetailsProgramDto> {
    return this.programService.findAll(options);
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
  search(
    @Query("query") query: string,
    @Query() options: PaginationOptionsDto
  ): Promise<PaginatedDetailsProgramDto> {
    return this.programService.search(query, options);
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
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsProgramDto> {
    const program = this.programService.findOne(id);
    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }
    return program;
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
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProgramDto: UpdateProgramDto
  ): Promise<DetailsProgramDto> {
    return this.programService.update(id, updateProgramDto);
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
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.programService.remove(id);
  }
}
