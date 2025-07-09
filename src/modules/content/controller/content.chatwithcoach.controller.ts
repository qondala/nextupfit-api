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
  ApiResponse
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
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsContentChatWithCoachDto
  })
  create(@Body() dto: CreateContentChatWithCoachDto): Promise<DetailsContentChatWithCoachDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get chatwithcoach",
    operationId: "findAllContentChatWithCoach"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsContentChatWithCoachDto
  })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentChatWithCoachDto> {
    return this.service.findAll(q);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get chatwithcoach",
    operationId: "findOneContentChatWithCoach"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChatWithCoachDto
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentChatWithCoachDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update chatwithcoach",
    operationId: "updateContentChatWithCoach"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsContentChatWithCoachDto
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentChatWithCoachDto,
  ): Promise<UpdateContentChatWithCoachDto> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete chatwithcoach",
    operationId: "removeContentChatWithCoach"
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
