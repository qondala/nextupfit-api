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
} from "@nestjs/common";
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
} from "@nestjs/swagger";
import { AffiliateProgram } from "../../entities/affiliate-program.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { AffiliateProgramsService } from "./affiliateprogram.service";
import { CreateAffiliateProgramDto } from "./dto/create-affiliate-program.dto";
import { UpdateAffiliateProgramDto } from "./dto/uptate-affiliate-program.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("AffiliatePrograms")
@ApiBearerAuth()
@Controller("affiliate-programs")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AffiliateProgramsController {
  constructor(
    private readonly affiliateProgramsService: AffiliateProgramsService,
  ) {}

  @Post()
  @Roles(UserRole.COACH)
  @ApiBody({ type: CreateAffiliateProgramDto })
  @ApiCreatedResponse({
    description: "Affiliate program created successfully",
    type: AffiliateProgram,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create affiliate program",
  })
  create(
    @Body() createAffiliateProgramDto: CreateAffiliateProgramDto,
    @Req() request: Request,
  ) {
    return this.affiliateProgramsService.create(
      createAffiliateProgramDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all affiliate programs",
    type: [AffiliateProgram],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate programs",
  })
  findAll() {
    return this.affiliateProgramsService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the affiliate program",
    type: "number",
  })
  @ApiOkResponse({
    description: "Affiliate program found successfully",
    type: AffiliateProgram,
  })
  @ApiNotFoundResponse({ description: "Affiliate program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate program",
  })
  findOne(@Param("id") id: string) {
    return this.affiliateProgramsService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the affiliate program",
    type: "number",
  })
  @ApiBody({ type: UpdateAffiliateProgramDto })
  @ApiOkResponse({
    description: "Affiliate program updated successfully",
    type: AffiliateProgram,
  })
  @ApiNotFoundResponse({ description: "Affiliate program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update affiliate program",
  })
  update(
    @Param("id") id: string,
    @Body() updateAffiliateProgramDto: UpdateAffiliateProgramDto,
    @Req() request: Request,
  ) {
    return this.affiliateProgramsService.update(
      +id,
      updateAffiliateProgramDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.COACH)
  @ApiParam({
    name: "id",
    description: "ID of the affiliate program",
    type: "number",
  })
  @ApiOkResponse({ description: "Affiliate program deleted successfully" })
  @ApiNotFoundResponse({ description: "Affiliate program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete affiliate program",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.affiliateProgramsService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of affiliate programs matching the search query",
    type: [AffiliateProgram],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search affiliate programs",
  })
  searchAffiliatePrograms(@Query("query") query: string) {
    return this.affiliateProgramsService.searchAffiliatePrograms(query);
  }

  @Get("content/:contentId")
  @ApiParam({
    name: "contentId",
    description: "ID of the content",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of affiliate programs for the content",
    type: [AffiliateProgram],
  })
  @ApiNotFoundResponse({ description: "Content not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate programs for the content",
  })
  findByContent(@Param("contentId") contentId: string) {
    return this.affiliateProgramsService.findByContent(+contentId);
  }
}
