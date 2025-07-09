import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import {
  CreatePaymentCartDto,
  UpdatePaymentCartDto,
  DetailsPaymentCartDto,
  PaginatedDetailsPaymentCartDto,
} from "../dto";
import { PaymentCartService } from "../service";
import { PaymentStatusEnum } from "../types";

@ApiTags("payment module endpoints")
@ApiBearerAuth()
@Controller("payment/cart")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentCartController {
  constructor(private readonly paymentCartService: PaymentCartService) {}

  @Post()
  @ApiOperation({
    summary: "Create payment cart",
    operationId: "createPaymentCart",
    tags: ["PaymentCart"],
  })
  @ApiBody({
    type: CreatePaymentCartDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsPaymentCartDto,
  })
  async create(
    @Body() dto: CreatePaymentCartDto,
  ): Promise<DetailsPaymentCartDto> {
    return this.paymentCartService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get payment carts paginated",
    operationId: "getPaymentCartsPaginated",
    tags: ["PaymentCart"],
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
    type: PaginatedDetailsPaymentCartDto,
  })
  async findAllUserPaymentCarts(
    @Query("page", ParseIntPipe) page = 1,
    @Query("limit", ParseIntPipe) limit = 10,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<PaginatedDetailsPaymentCartDto> {
    return this.paymentCartService.findAllUserPaymentCarts(userId, { page, limit });
  }

  
  @Get(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentCartDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsPaymentCartDto> {
    return this.paymentCartService.findOne(id);
  }

  @Put(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentCartDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentCartDto,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<DetailsPaymentCartDto> {
    return this.paymentCartService.update(id, dto, userId);
  }

  @Put("payment-cart/:paymentCartId/status/:status")
  @ApiParam({
    name: "paymentCartId",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiParam({
    name: "status",
    required: true,
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentCartDto,
  })
  async updatePayementCartStatus(
    @Param("paymentCartId", ParseIntPipe) paymentCartId: number,
    @Param("status", new ParseEnumPipe(PaymentStatusEnum)) status: PaymentStatusEnum,
  ): Promise<DetailsPaymentCartDto> {
    return this.paymentCartService.updatePayementCartStatus(paymentCartId, status);
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
    return this.paymentCartService.remove(id, userId);
  }
}
