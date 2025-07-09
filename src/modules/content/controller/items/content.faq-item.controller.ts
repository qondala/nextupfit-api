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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateContentFaqItemDto,
  UpdateContentFaqItemDto,
  DetailsContentFaqItemDto,
  PaginatedDetailsContentFaqItemDto,
} from "../../dto";
import { ContentFaqItemService } from "../../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/faq/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentFaqItemController {
  constructor(private readonly faqItemService: ContentFaqItemService) {}

  @Post()
  @ApiOperation({ summary: "Create FAQ item", operationId: "createContentFaqItem" })
  @ApiResponse({ status: HttpStatus.CREATED, type: DetailsContentFaqItemDto })
  create(@Body() dto: CreateContentFaqItemDto): Promise<DetailsContentFaqItemDto> {
    return this.faqItemService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get FAQ items", operationId: "findAllContentFaqItems" })
  @ApiResponse({ status: HttpStatus.OK, type: PaginatedDetailsContentFaqItemDto })
  findAll(@Query() q: PaginationOptionsDto): Promise<PaginatedDetailsContentFaqItemDto> {
    return this.faqItemService.findAll(q);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get FAQ item", operationId: "findOneContentFaqItem" })
  @ApiResponse({ status: HttpStatus.OK, type: DetailsContentFaqItemDto })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentFaqItemDto> {
    return this.faqItemService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update FAQ item", operationId: "updateContentFaqItem" })
  @ApiResponse({ status: HttpStatus.OK, type: DetailsContentFaqItemDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentFaqItemDto,
  ): Promise<DetailsContentFaqItemDto> {
    return this.faqItemService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete FAQ item", operationId: "removeContentFaqItem" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.faqItemService.remove(id);
  }
}
