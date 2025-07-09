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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiParam
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import { ContentChatWithCoachService } from "../service";
import {
  CreateContentChatWithCoachDto,
  UpdateContentChatWithCoachDto,
  DetailsContentChatWithCoachDto,
  PaginatedDetailsContentChatWithCoachDto,
} from "../dto";
import { SwaggerType } from "@app/common/types";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/chatwithcoach")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentChatWithCoachController {
  constructor(private readonly service: ContentChatWithCoachService) {}

  @Post()
  @ApiOperation({
    summary: "Create chatwithcoach",
    operationId: "createContentChatWithCoach"
  })
  @ApiBody({
    type: CreateContentChatWithCoachDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentChatWithCoachDto
  })
  async create(@Body() dto: CreateContentChatWithCoachDto): Promise<DetailsContentChatWithCoachDto> {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get chatwithcoach",
    operationId: "findAllContentChatWithCoach"
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
    type: PaginatedDetailsContentChatWithCoachDto
  })
  async findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentChatWithCoachDto> {
    return await this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get chatwithcoach",
    operationId: "findOneContentChatWithCoach"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChatWithCoachDto
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentChatWithCoachDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update chatwithcoach",
    operationId: "updateContentChatWithCoach"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiBody({
    type: UpdateContentChatWithCoachDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChatWithCoachDto
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentChatWithCoachDto,
  ): Promise<UpdateContentChatWithCoachDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete chatwithcoach",
    operationId: "removeContentChatWithCoach"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
