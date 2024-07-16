import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";

import { Request } from "express";
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { PerformanceRecord } from "../../entities/performance-record.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { CreatePerformanceRecordDto } from "./dto/create-performancerecords.dto";
import { UpdatePerformanceRecordDto } from "./dto/update-performancerecords.dto";
import { PerformanceRecordsService } from "./performancerecords.servive";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("PerformanceRecords")
@ApiBearerAuth()
@Controller("performance-records")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PerformanceRecordsController {
  constructor(
    private readonly performanceRecordsService: PerformanceRecordsService,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreatePerformanceRecordDto })
  @ApiCreatedResponse({
    description: "Performance record created successfully",
    type: PerformanceRecord,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create performance record",
  })
  create(
    @Body() createPerformanceRecordDto: CreatePerformanceRecordDto,
    @Req() request: Request,
  ) {
    return this.performanceRecordsService.create(
      createPerformanceRecordDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all performance records",
    type: [PerformanceRecord],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch performance records",
  })
  findAll() {
    return this.performanceRecordsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the performance record",
    type: "number",
  })
  @ApiOkResponse({
    description: "Performance record found successfully",
    type: PerformanceRecord,
  })
  @ApiNotFoundResponse({ description: "Performance record not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch performance record",
  })
  findOne(@Param("id") id: string) {
    return this.performanceRecordsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the performance record",
    type: "number",
  })
  @ApiBody({ type: UpdatePerformanceRecordDto })
  @ApiOkResponse({
    description: "Performance record updated successfully",
    type: PerformanceRecord,
  })
  @ApiNotFoundResponse({ description: "Performance record not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update performance record",
  })
  update(
    @Param("id") id: string,
    @Body() updatePerformanceRecordDto: UpdatePerformanceRecordDto,
    @Req() request: Request,
  ) {
    return this.performanceRecordsService.update(
      +id,
      updatePerformanceRecordDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the performance record",
    type: "number",
  })
  @ApiOkResponse({ description: "Performance record deleted successfully" })
  @ApiNotFoundResponse({ description: "Performance record not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete performance record",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.performanceRecordsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of performance records matching the search query",
    type: [PerformanceRecord],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search performance records",
  })
  searchPerformanceRecords(@Query("query") query: string) {
    return this.performanceRecordsService.searchPerformanceRecords(query);
  }

  @Get("user-program/:userProgramId")
  @ApiParam({
    name: "userProgramId",
    description: "ID of the user program",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of performance records for the user program",
    type: [PerformanceRecord],
  })
  @ApiNotFoundResponse({ description: "User program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch performance records for the user program",
  })
  findByUserProgram(@Param("userProgramId") userProgramId: string) {
    return this.performanceRecordsService.findByUserProgram(+userProgramId);
  }
}
