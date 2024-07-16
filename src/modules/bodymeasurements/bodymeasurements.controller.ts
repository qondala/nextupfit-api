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
import { CreateBodyMeasurementDto } from "./dto/create-bodymeasurement.dto";
import { UpdateBodyMeasurementDto } from "./dto/update-bodymeasurement.dto";

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
import { BodyMeasurement } from "../../entities/body-measurement.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { BodyMeasurementsService } from "./bodymeasurement.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("BodyMeasurements")
@ApiBearerAuth()
@Controller("body-measurements")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BodyMeasurementsController {
  constructor(
    private readonly bodyMeasurementsService: BodyMeasurementsService,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateBodyMeasurementDto })
  @ApiCreatedResponse({
    description: "Body measurement created successfully",
    type: BodyMeasurement,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create body measurement",
  })
  create(
    @Body() createBodyMeasurementDto: CreateBodyMeasurementDto,
    @Req() request: Request,
  ) {
    return this.bodyMeasurementsService.create(
      createBodyMeasurementDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all body measurements",
    type: [BodyMeasurement],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch body measurements",
  })
  findAll() {
    return this.bodyMeasurementsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the body measurement",
    type: "number",
  })
  @ApiOkResponse({
    description: "Body measurement found successfully",
    type: BodyMeasurement,
  })
  @ApiNotFoundResponse({ description: "Body measurement not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch body measurement",
  })
  findOne(@Param("id") id: string) {
    return this.bodyMeasurementsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the body measurement",
    type: "number",
  })
  @ApiBody({ type: UpdateBodyMeasurementDto })
  @ApiOkResponse({
    description: "Body measurement updated successfully",
    type: BodyMeasurement,
  })
  @ApiNotFoundResponse({ description: "Body measurement not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update body measurement",
  })
  update(
    @Param("id") id: string,
    @Body() updateBodyMeasurementDto: UpdateBodyMeasurementDto,
    @Req() request: Request,
  ) {
    return this.bodyMeasurementsService.update(
      +id,
      updateBodyMeasurementDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the body measurement",
    type: "number",
  })
  @ApiOkResponse({ description: "Body measurement deleted successfully" })
  @ApiNotFoundResponse({ description: "Body measurement not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete body measurement",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.bodyMeasurementsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of body measurements matching the search query",
    type: [BodyMeasurement],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search body measurements",
  })
  searchBodyMeasurements(@Query("query") query: string) {
    return this.bodyMeasurementsService.searchBodyMeasurements(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of body measurements for the user",
    type: [BodyMeasurement],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch body measurements for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.bodyMeasurementsService.findByUser(+userId);
  }
}
