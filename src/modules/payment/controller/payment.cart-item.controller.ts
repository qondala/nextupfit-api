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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import {
  CreatePaymentCartItemDto,
  UpdatePaymentCartItemDto,
  DetailsPaymentCartItemDto,
  PaginatedDetailsPaymentCartItemDto,
} from "../dto";
import { PaymentCartItemService } from "../service";
import { PaymentStatusEnum } from "../types";

@ApiTags("payment module endpoints")
@ApiBearerAuth()
@Controller("payment/cart-item")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentCartItemController {
  constructor(private readonly paymentCartItemService: PaymentCartItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create payment cart item",
    operationId: "createPaymentCart",
    tags: ["PaymentCart"],
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsPaymentCartItemDto,
  })
  async create(
    @Body() dto: CreatePaymentCartItemDto
  ): Promise<DetailsPaymentCartItemDto> {
    return this.paymentCartItemService.create(dto);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: "Get user payment cart items paginated",
    operationId: "getUserPaymentCartItemsPaginated",
    tags: ["PaymentCart"],
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
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
    type: PaginatedDetailsPaymentCartItemDto,
  })
  async findAllUserPaymentCarts(
    @Param("userId", ParseIntPipe) userId: number,
    @Query("page", ParseIntPipe) page = 1,
    @Query("limit", ParseIntPipe) limit = 10,
  ): Promise<PaginatedDetailsPaymentCartItemDto> {
    return this.paymentCartItemService.findAllUserPaymentCartItems(userId, { page, limit });
  }

  // findAllUserPaymentCartItemsByCartId
  @Get('user/:userId/cart/:cartId')
  @ApiOperation({
    summary: "Get user payment cart items paginated",
    operationId: "getUserPaymentCartItemsPaginated",
    tags: ["PaymentCart"],
  })
  @ApiParam({
    name: "userId",
    required: true,
    type: SwaggerType.INTEGER,
  })
  @ApiParam({
    name: "cartId",
    required: true,
    type: SwaggerType.INTEGER,
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
    type: PaginatedDetailsPaymentCartItemDto,
  })
  async findAllUserPaymentCartItemsByCartId(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("cartId", ParseIntPipe) cartId: number,
    @Query("page", ParseIntPipe) page = 1,
    @Query("limit", ParseIntPipe) limit = 10,
  ): Promise<PaginatedDetailsPaymentCartItemDto> {
    return this.paymentCartItemService.findAllUserPaymentCartItemsByCartId(userId, cartId, { page, limit });
  }


  @Get(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentCartItemDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsPaymentCartItemDto> {
    return this.paymentCartItemService.findOne(id);
  }

  @Put(":id")
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentCartItemDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentCartItemDto,
    @Query("userId", ParseIntPipe) userId: number,
  ): Promise<DetailsPaymentCartItemDto> {
    return this.paymentCartItemService.update(id, dto, userId);
  }

  @Put("payment-cart-item/:paymentCartItemId/status/:status")
  @ApiParam({
    name: "paymentCartItemId",
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
    type: DetailsPaymentCartItemDto,
  })
  async updatePayementCartItemStatus(
    @Param("paymentCartItemId", ParseIntPipe) paymentCartItemId: number,
    @Param("status", new ParseEnumPipe(PaymentStatusEnum)) status: PaymentStatusEnum,
  ): Promise<DetailsPaymentCartItemDto> {
    return this.paymentCartItemService.updatePayementCartItemStatus(paymentCartItemId, status);
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
    return this.paymentCartItemService.remove(id, userId);
  }
}
