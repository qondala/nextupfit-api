import { PartialType } from "@nestjs/mapped-types";

import { CreatePaymentTransferDto } from "../create";

export class UpdatePaymentTransferDto extends PartialType(CreatePaymentTransferDto) {}
