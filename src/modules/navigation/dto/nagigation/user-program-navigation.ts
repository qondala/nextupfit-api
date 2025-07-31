import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


import { ProgramNavigationNode } from "..";


export class UserProgramNavigation {

  @ApiProperty({
    type: () => ProgramNavigationNode,
    title: "ProgramNavigationNode",
    description: "Program navigation item",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => ProgramNavigationNode)
  currentNavigation: ProgramNavigationNode;

  @ApiProperty({
    type: () => ProgramNavigationNode,
    title: "ProgramNavigationNode",
    description: "Program navigation item",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => ProgramNavigationNode)
  previousNavigation: ProgramNavigationNode;

  @ApiProperty({
    type: () => ProgramNavigationNode,
    title: "ProgramNavigationNode",
    description: "Program navigation item",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => ProgramNavigationNode)
  nextNavigation: ProgramNavigationNode;
}
