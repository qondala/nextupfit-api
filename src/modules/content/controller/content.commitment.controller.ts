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
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentCommitmentDto,
  })
  create(@Body() dto: CreateContentCommitmentDto): Promise<DetailsContentCommitmentDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get commitments",
    operationId: "findAllContentCommitments",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentCommitmentDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentCommitmentDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get commitment",
    operationId: "findOneContentCommitment",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCommitmentDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentCommitmentDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update commitment",
    operationId: "updateContentCommitment",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentCommitmentDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentCommitmentDto,
  ): Promise<DetailsContentCommitmentDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete commitment",
    operationId: "removeContentCommitment",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
