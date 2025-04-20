import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEcommerceCartItemDTO {
  @ApiProperty({
    description: "User Id",
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: "User Id",
    example: 345334,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: "User Id",
    example: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: "Product name",
    example: "Apple",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty({
    description: "Order Id",
    example: 897897,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: "Product name",
    example: "I love apples, please select only red ones",
    required: true,
  })
  @IsOptional()
  @IsString()
  userComment?: string;
}
