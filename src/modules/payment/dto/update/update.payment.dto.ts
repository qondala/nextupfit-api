import { PartialType } from "@nestjs/mapped-types";
import { CreatePaymentDto } from "../create/create.payment.dto";

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
