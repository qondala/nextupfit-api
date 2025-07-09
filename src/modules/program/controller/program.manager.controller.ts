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

import { ProgramItemTypeEnum } from "@app/module/program/types";
import {
  CreateProgramManagerDto,
  UpdateProgramManagerDto,
  DetailsProgramManagerDto,
  PaginatedDetailsProgramManagerDto
} from "../dto";

import { ProgramManagerService } from "../service";

@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/managers")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramManagerController {
  constructor(private readonly programManagerService: ProgramManagerService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program manager",
    operationId: "createProgramManager"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program manager has been successfully created.",
    type: DetailsProgramManagerDto,
  })
  create(@Body() createProgramManagerDto: CreateProgramManagerDto): Promise<DetailsProgramManagerDto> {
    return this.programManagerService.create(createProgramManagerDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program managers with pagination",
    operationId: "findAllProgramManagers"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program managers.",
    type: PaginatedDetailsProgramManagerDto,
  })
  findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsProgramManagerDto> {
    return this.programManagerService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get a program manager by ID",
    operationId: "findOneProgramManager"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program manager.",
    type: DetailsProgramManagerDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsProgramManagerDto> {
    return this.programManagerService.findOne(id);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: "Get program managers by manager ID",
    operationId: "findByManagerId"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program managers for the manager.",
    type: [DetailsProgramManagerDto],
  })
  findByManagerId(@Param('managerId', ParseIntPipe) managerId: number): Promise<DetailsProgramManagerDto[]> {
    return this.programManagerService.findByManagerId(managerId);
  }

  @Get('item/:itemType/:itemId')
  @ApiOperation({
    summary: "Get program managers by item type and ID",
    operationId: "findByItemTypeAndItemId"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program managers for the item.",
    type: [DetailsProgramManagerDto],
  })
  findByItemTypeAndItemId(
    @Param('itemType') itemType: ProgramItemTypeEnum,
    @Param('itemId', ParseIntPipe) itemId: number
  ): Promise<DetailsProgramManagerDto[]> {
    return this.programManagerService.findByItemTypeAndItemId(itemType, itemId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update a program manager",
    operationId: "updateProgramManager"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program manager has been successfully updated.",
    type: DetailsProgramManagerDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramManagerDto: UpdateProgramManagerDto
  ): Promise<DetailsProgramManagerDto> {
    return this.programManagerService.update(id, updateProgramManagerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete a program manager",
    operationId: "removeProgramManager"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program manager has been successfully deleted.",
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.programManagerService.remove(id);
  }
}
