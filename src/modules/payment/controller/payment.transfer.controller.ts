import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";
import {
  CreatePaymentTransferDto,
  UpdatePaymentTransferDto,
  DetailsPaymentTransferDto,
  PaginatedDetailsPaymentTransferDto,
} from "../dto";
import { PaymentTransferService } from "../service";

@ApiTags("PaymentTransfer")
@ApiBearerAuth()
@Controller("payment-transfer")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentTransferController {
  constructor(private readonly paymentTransferService: PaymentTransferService) {}

  @Post()
  @ApiOperation({
    summary: "Create payment transfer",
    description: "Create payment transfer",
    operationId: "createPaymentTransfer",
    tags: ["PaymentTransfer"],
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsPaymentTransferDto,
  })
  async create(
    @Body() createDto: CreatePaymentTransferDto,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<DetailsPaymentTransferDto> {
    return await this.paymentTransferService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({
    summary: "Get payment transfers paginated",
    description: "Get payment transfers paginated",
    operationId: "getPaymentTransfersPaginated",
    tags: ["PaymentTransfer"],
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
  @ApiQuery({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsPaymentTransferDto,
  })
  async findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<PaginatedDetailsPaymentTransferDto> {
    return await this.paymentTransferService.findAll({ page: +page, limit: +limit }, userId);
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentTransferDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsPaymentTransferDto> {
    return await this.paymentTransferService.findOne(id);
  }

  @Put(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentTransferDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdatePaymentTransferDto,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<DetailsPaymentTransferDto> {
    return await this.paymentTransferService.update(id, updateDto, userId);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<void> {
    return await this.paymentTransferService.remove(id, userId);
  }
}
