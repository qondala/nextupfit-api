import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto, PaginationOptionsDto } from '@app/common/dto';

import { CreatePaymentDto, UpdatePaymentDto } from '../dto';
import { PaymentService } from '../service';
import { PaymentEntity } from '../entity';


@ApiTags('Payment module endpoints')
@ApiBearerAuth()
@Controller('payment')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully.' })
  create(
    @Body() createDto: CreatePaymentDto,
    @User('id') userId: number
  ) {
    return this.paymentService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  async findAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @User('id') userId: number
  ): Promise<PaginatedResponseDto<PaymentEntity>> {
    return this.paymentService.findAll(paginationOptions, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by id' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update payment' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePaymentDto,
    @User('id') userId: number
  ) {
    return this.paymentService.update(+id, updateDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete payment' })
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.paymentService.remove(+id, userId);
  }
}
