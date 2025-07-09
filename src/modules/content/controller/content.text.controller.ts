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

import { ContentTextService } from "../service";
import {
  CreateContentTextDto,
  UpdateContentTextDto,
  DetailsContentTextDto,
  PaginatedDetailsContentTextDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/text")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentTextController {
  constructor(private readonly service: ContentTextService) {}

  @Post()
  @ApiOperation({
    summary: "Create text",
    operationId: "createContentText",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentTextDto,
  })
  create(@Body() dto: CreateContentTextDto): Promise<DetailsContentTextDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get texts",
    operationId: "findAllContentText",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentTextDto,
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentTextDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get text",
    operationId: "findOneContentText",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentTextDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentTextDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update text",
    operationId: "updateContentText",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentTextDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentTextDto,
  ): Promise<DetailsContentTextDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete text",
    operationId: "removeContentText",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
