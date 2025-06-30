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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ProgramStepActivityWorkingsessionService } from "../service";
import {
  CreateProgramStepActivityWorkingsessionDto,
  UpdateProgramStepActivityWorkingsessionDto,
  DetailsProgramStepActivityWorkingsessionDto,
  PaginatedDetailsProgramStepActivityWorkingsessionDto
} from "../dto";

@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/step-activity-workingsessions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramStepActivityWorkingsessionController {
  constructor(private readonly programStepActivityWorkingsessionService: ProgramStepActivityWorkingsessionService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program step activity workingsession",
    operationId: "createProgramStepActivityWorkingsession"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program step activity workingsession has been successfully created.",
    type: DetailsProgramStepActivityWorkingsessionDto,
  })
  create(@Body() createProgramStepActivityWorkingsessionDto: CreateProgramStepActivityWorkingsessionDto): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    return this.programStepActivityWorkingsessionService.create(createProgramStepActivityWorkingsessionDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program step activity workingsessions with pagination",
    operationId: "findAllProgramStepActivityWorkingsessions"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program step activity workingsessions.",
    type: PaginatedDetailsProgramStepActivityWorkingsessionDto,
  })
  findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsProgramStepActivityWorkingsessionDto> {
    return this.programStepActivityWorkingsessionService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get a program step activity workingsession by ID",
    operationId: "findOneProgramStepActivityWorkingsession"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program step activity workingsession.",
    type: DetailsProgramStepActivityWorkingsessionDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    return this.programStepActivityWorkingsessionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update a program step activity workingsession",
    operationId: "updateProgramStepActivityWorkingsession"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program step activity workingsession has been successfully updated.",
    type: DetailsProgramStepActivityWorkingsessionDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramStepActivityWorkingsessionDto: UpdateProgramStepActivityWorkingsessionDto
  ): Promise<DetailsProgramStepActivityWorkingsessionDto> {
    return this.programStepActivityWorkingsessionService.update(id, updateProgramStepActivityWorkingsessionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete a program step activity workingsession",
    operationId: "removeProgramStepActivityWorkingsession"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program step activity workingsession has been successfully deleted.",
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.programStepActivityWorkingsessionService.remove(id);
  }
}
