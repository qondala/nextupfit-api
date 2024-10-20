import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  NotFoundException,
} from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Request } from "express";
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
  ApiBadRequestResponse,
} from "@nestjs/swagger";
import { Stripe } from "stripe";
import { Inject } from "@nestjs/common";
import { Payment } from "../../entities/payment.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { PaymentsService } from "./payments.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("Payments")
@ApiBearerAuth()
@Controller("payments")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    @Inject(Stripe)
    private stripe: Stripe,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreatePaymentDto })
  @ApiCreatedResponse({
    description: "Payment created successfully",
    type: Payment,
  })
  @ApiBadRequestResponse({ description: "Invalid payment details" })
  @ApiInternalServerErrorResponse({ description: "Failed to create payment" })
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() request: Request,
  ) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: createPaymentDto.amount * 100, // Convert to cents
        currency: createPaymentDto.currency, // Choose your currency
        payment_method_types: ["card", "paypal"], // Allow card payments
        metadata: {
          userId: request.user.id,
          contents: JSON.stringify(
            createPaymentDto.contents.map<{ id: number }>((contentId) => {
              return { id: contentId };
            }),
          ),
        },
      });

      return this.paymentsService.create(
        createPaymentDto,
        request.user.id,
        paymentIntent.client_secret,
        paymentIntent.id, // Store Stripe payment intent ID
      );
    } catch (error) {
      // Handle Stripe errors
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }

  @Get()
  @ApiOkResponse({ description: "List of all payments", type: [Payment] })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch payments" })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", description: "ID of the payment", type: "number" })
  @ApiOkResponse({ description: "Payment found successfully", type: Payment })
  @ApiNotFoundResponse({ description: "Payment not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch payment" })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({ name: "id", description: "ID of the payment", type: "number" })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiOkResponse({ description: "Payment updated successfully", type: Payment })
  @ApiNotFoundResponse({ description: "Payment not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to update payment" })
  update(
    @Param("id") id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Req() request: Request,
  ) {
    return this.paymentsService.update(+id, updatePaymentDto, request.user.id);
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({ name: "id", description: "ID of the payment", type: "number" })
  @ApiOkResponse({ description: "Payment deleted successfully" })
  @ApiNotFoundResponse({ description: "Payment not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to delete payment" })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.paymentsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of payments matching the search query",
    type: [Payment],
  })
  @ApiInternalServerErrorResponse({ description: "Failed to search payments" })
  searchPayments(@Query("query") query: string) {
    return this.paymentsService.searchPayments(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of payments for the user",
    type: [Payment],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch payments for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.paymentsService.findByUser(+userId);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of payments for the content",
    type: [Payment],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch payments for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.paymentsService.findByContent(+contentId);
  }

  @Post(":id/refund")
  @Roles(UserRole.ADMIN) // Seule l'admin peut effectuer des remboursements
  @ApiParam({ name: "id", description: "ID of the payment", type: "number" })
  @ApiOkResponse({ description: "Payment refunded successfully" })
  @ApiNotFoundResponse({ description: "Payment not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to refund payment" })
  async refund(@Param("id") id: string) {
    const payment = await this.paymentsService.findOne(+id);
    if (payment.intentId) {
      try {
        await this.stripe.refunds.create({
          payment_intent: payment.intentId,
        });
        return { message: "Payment refunded successfully" };
      } catch (error) {
        console.error("Error refunding payment:", error);
        throw error;
      }
    } else {
      throw new NotFoundException(
        "Payment not found or not eligible for refund",
      );
    }
  }

  @Get("contents") // Nouvelle route
  @ApiOkResponse({
    description: "List of payments for the given content IDs",
    type: [Payment],
  })
  @ApiNotFoundResponse({ description: "Payments not found" })
  @ApiInternalServerErrorResponse({ description: "Failed to fetch payments" })
  findByContentIds(@Query("contentIds") contentIds: string) {
    const ids = contentIds.split(",").map((id) => parseInt(id)); // Convertir la chaîne en tableau de nombres
    return this.paymentsService.findByContentIds(ids);
  }
}
