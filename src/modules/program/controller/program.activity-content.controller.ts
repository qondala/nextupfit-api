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
  ApiBearerAuth
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ProgramActivityContentService } from "../service";
import {
  CreateProgramActivityContentDto,
  UpdateProgramActivityContentDto,
  DetailsProgramActivityContentDto,
  PaginatedDetailsProgramActivityContentDto
} from "../dto";

@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/activity-contents")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramActivityContentController {
  constructor(private readonly programActivityContentService: ProgramActivityContentService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program activity content",
    operationId: "createProgramActivityContent"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program activity content has been successfully created.",
    type: DetailsProgramActivityContentDto,
  })
  create(@Body() createProgramActivityContentDto: CreateProgramActivityContentDto): Promise<DetailsProgramActivityContentDto> {
    return this.programActivityContentService.create(createProgramActivityContentDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program activity contents with pagination",
    operationId: "findAllProgramActivityContents"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program activity contents.",
    type: PaginatedDetailsProgramActivityContentDto,
  })
  findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsProgramActivityContentDto> {
    return this.programActivityContentService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get a program activity content by ID",
    operationId: "findOneProgramActivityContent"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program activity content.",
    type: DetailsProgramActivityContentDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsProgramActivityContentDto> {
    return this.programActivityContentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update a program activity content",
    operationId: "updateProgramActivityContent"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program activity content has been successfully updated.",
    type: DetailsProgramActivityContentDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramActivityContentDto: UpdateProgramActivityContentDto
  ): Promise<DetailsProgramActivityContentDto> {
    return this.programActivityContentService.update(id, updateProgramActivityContentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete a program activity content",
    operationId: "removeProgramActivityContent"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program activity content has been successfully deleted.",
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.programActivityContentService.remove(id);
  }
}
