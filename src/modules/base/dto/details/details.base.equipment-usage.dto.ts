import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class DetailsBaseEquipmentUsageDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Identifier",
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Equipment usage name",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
