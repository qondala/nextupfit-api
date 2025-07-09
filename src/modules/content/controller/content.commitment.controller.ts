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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import { ContentCommitmentService } from "../service";
import {
  CreateContentCommitmentDto,
  UpdateContentCommitmentDto,
  DetailsContentCommitmentDto,
  PaginatedDetailsContentCommitmentDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/commitment")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentCommitmentController {
  constructor(private readonly service: ContentCommitmentService) {}

  @Post()
  @ApiOperation({
    summary: "Create commitment",
    operationId: "createContentCommitment",
  })
  @ApiBody({
    type: CreateContentCommitmentDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentCommitmentDto,
  })
  async create(@Body() dto: CreateContentCommitmentDto): Promise<DetailsContentCommitmentDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get commitments",
    operationId: "findAllContentCommitments",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentCommitmentDto,
  })
  async findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentCommitmentDto> {
    return await this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get commitment",
    operationId: "findOneContentCommitment",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCommitmentDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentCommitmentDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update commitment",
    operationId: "updateContentCommitment",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentCommitmentDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCommitmentDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentCommitmentDto,
  ): Promise<DetailsContentCommitmentDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete commitment",
    operationId: "removeContentCommitment",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
