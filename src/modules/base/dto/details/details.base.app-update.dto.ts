import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class DetailsBaseAppUpdateDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the app update",
    example: 1,
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: "Update version (semantic)",
    example: "1.0.0",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  version: string;

  @ApiProperty({
    description: "Version name",
    example: "Starter",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Feature list (text)",
    example: "- Initial release\n- Basic functionality",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  features: string;

  @ApiProperty({
    description: "Change log",
    example: "Added onboarding flow and bug fixes",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  changes: string;
}
