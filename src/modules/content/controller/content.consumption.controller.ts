import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ContentConsumptionService } from "../service";
import {
  CreateContentConsumptionDto,
  UpdateContentConsumptionDto,
  DetailsContentConsumptionDto,
  PaginatedDetailsContentConsumptionDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/consumption")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentConsumptionController {
  constructor(private readonly service: ContentConsumptionService) {}

  @Post()
  @ApiOperation({
    summary: "Create consumption",
    operationId: "createContentConsumption",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentConsumptionDto,
  })
  create(@Body() dto: CreateContentConsumptionDto): Promise<DetailsContentConsumptionDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get consumption",
    operationId: "findAllContentConsumption",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentConsumptionDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentConsumptionDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get consumption",
    operationId: "findOneContentConsumption",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentConsumptionDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentConsumptionDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update consumption",
    operationId: "updateContentConsumption",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentConsumptionDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentConsumptionDto,
  ): Promise<DetailsContentConsumptionDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete consumption",
    operationId: "removeContentConsumption",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
