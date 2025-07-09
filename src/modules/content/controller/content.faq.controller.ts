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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ContentFaqService } from "../service";
import {
  CreateContentFaqDto,
  UpdateContentFaqDto,
  DetailsContentFaqDto,
  PaginatedDetailsContentFaqDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/faq")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentFaqController {
  constructor(private readonly service: ContentFaqService) {}

  @Post()
  @ApiOperation({
    summary: "Create FAQ",
    operationId: "createContentFaq",
  })
  @ApiBody({
    type: CreateContentFaqDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentFaqDto,
    description: "FAQ created successfully",
  })
  async create(@Body() dto: CreateContentFaqDto): Promise<DetailsContentFaqDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get FAQ list",
    operationId: "findAllContentFaq",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentFaqDto,
    description: "FAQ list found successfully",
  })
  async findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentFaqDto> {
    return await this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get FAQ",
    operationId: "findOneContentFaq",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentFaqDto,
    description: "FAQ found successfully",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentFaqDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update FAQ",
    operationId: "updateContentFaq",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentFaqDto,
    description: "FAQ updated successfully",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentFaqDto,
  ): Promise<DetailsContentFaqDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete FAQ",
    operationId: "removeContentFaq",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "FAQ deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
