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

import { ContentTextareaService } from "../service";
import {
  CreateContentTextareaDto,
  UpdateContentTextareaDto,
  DetailsContentTextareaDto,
  PaginatedDetailsContentTextareaDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/textarea")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentTextareaController {
  constructor(private readonly service: ContentTextareaService) {}

  @Post()
  @ApiOperation({
    summary: "Create textarea",
    operationId: "createContentTextarea",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentTextareaDto,
  })
  create(@Body() dto: CreateContentTextareaDto): Promise<DetailsContentTextareaDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get textareas",
    operationId: "findAllContentTextarea",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentTextareaDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentTextareaDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get textarea",
    operationId: "findOneContentTextarea",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentTextareaDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentTextareaDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update textarea",
    operationId: "updateContentTextarea",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentTextareaDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentTextareaDto,
  ): Promise<DetailsContentTextareaDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete textarea",
    operationId: "removeContentTextarea",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
