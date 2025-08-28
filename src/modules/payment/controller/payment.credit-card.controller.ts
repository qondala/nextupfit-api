import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';
import { PaginationOptionsDto } from '@app/common/dto';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import { PaymentCreditCardService } from '../service';

import {
  CreatePaymentCreditCardDto,
  UpdatePaymentCreditCardDto,
  DetailsPaymentCreditCardDto,
  PaginatedDetailsPaymentCreditCardDto,
} from '../dto';

@ApiTags('Payment module endpoints')
@ApiBearerAuth()
@Controller('payment/credit-cards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentCreditCardController {
  constructor(
    private readonly paymentCreditCardService: PaymentCreditCardService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new payment credit card',
    operationId: 'createPaymentCreditCard',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailsPaymentCreditCardDto,
    description: 'Payment credit card created successfully',
  })
  async create(
    @Body() createDto: CreatePaymentCreditCardDto,
  ): Promise<DetailsPaymentCreditCardDto> {
    return this.paymentCreditCardService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a payment credit card by ID',
    operationId: 'getPaymentCreditCard',
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER,
    description: 'Payment credit card ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentCreditCardDto,
    description: 'Payment credit card found',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DetailsPaymentCreditCardDto> {
    return this.paymentCreditCardService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a payment credit card',
    operationId: 'updatePaymentCreditCard',
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER,
    description: 'Payment credit card ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailsPaymentCreditCardDto,
    description: 'Payment credit card updated successfully',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePaymentCreditCardDto,
  ): Promise<DetailsPaymentCreditCardDto> {
    return this.paymentCreditCardService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a payment credit card',
    operationId: 'deletePaymentCreditCard',
  })
  @ApiParam({
    name: 'id',
    type: SwaggerType.INTEGER,
    description: 'Payment credit card ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment credit card deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.paymentCreditCardService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all payment credit cards by user ID',
    operationId: 'getUserPaymentCreditCards',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'User ID',
  })
  @ApiQuery({
    name: 'pagination',
    required: true,
    type: PaginationOptionsDto,
    description: 'Pagination options',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedDetailsPaymentCreditCardDto,
    description: 'List of payment credit cards',
  })
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsPaymentCreditCardDto> {
    return this.paymentCreditCardService.findAllByUserId(userId, pagination);
  }
}
