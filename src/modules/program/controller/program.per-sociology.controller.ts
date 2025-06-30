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

import { ProgramPerSociologyService } from "../service";
import {
    CreateProgramPerSociologyDto,
    UpdateProgramPerSociologyDto,
    DetailsProgramPerSociologyDto,
    PaginatedDetailsProgramPerSociologyDto
} from "../dto";


@ApiTags("Programs")
@ApiBearerAuth()
@Controller("programs/per-sociology")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgramPerSociologyController {
  constructor(
    private readonly programPerSociologyService: ProgramPerSociologyService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new program per sociology",
    operationId: "createProgramPerSociology"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The program per sociology has been successfully created.",
    type: DetailsProgramPerSociologyDto,
  })
  create(@Body() createProgramPerSociologyDto: CreateProgramPerSociologyDto): Promise<DetailsProgramPerSociologyDto> {
    return this.programPerSociologyService.create(createProgramPerSociologyDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all program per sociologies with pagination",
    operationId: "findAllProgramPerSociologies"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program per sociologies.",
    type: PaginatedDetailsProgramPerSociologyDto,
  })
  findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginatedDetailsProgramPerSociologyDto> {
    return this.programPerSociologyService.findAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get a program per sociology by ID",
    operationId: "findOneProgramPerSociology"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved program per sociology.",
    type: DetailsProgramPerSociologyDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsProgramPerSociologyDto> {
    return this.programPerSociologyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update a program per sociology",
    operationId: "updateProgramPerSociology"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The program per sociology has been successfully updated.",
    type: DetailsProgramPerSociologyDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramPerSociologyDto: UpdateProgramPerSociologyDto
  ): Promise<DetailsProgramPerSociologyDto> {
    return this.programPerSociologyService.update(id, updateProgramPerSociologyDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete a program per sociology",
    operationId: "removeProgramPerSociology"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The program per sociology has been successfully deleted.",
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.programPerSociologyService.remove(id);
  }
}
