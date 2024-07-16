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
import { AffiliateLink } from "../../entities/affiliate-link.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { AffiliateLinksService } from "./affiliatelinks.service";
import { CreateAffiliateLinkDto } from "./dto/create-affiliate-links.dto";
import { UpdateAffiliateLinkDto } from "./dto/update-affiliate-links.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("AffiliateLinks")
@ApiBearerAuth()
@Controller("affiliate-links")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AffiliateLinksController {
  constructor(private readonly affiliateLinksService: AffiliateLinksService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiBody({ type: CreateAffiliateLinkDto })
  @ApiCreatedResponse({
    description: "Affiliate link created successfully",
    type: AffiliateLink,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create affiliate link",
  })
  create(
    @Body() createAffiliateLinkDto: CreateAffiliateLinkDto,
    @Req() request: Request,
  ) {
    return this.affiliateLinksService.create(
      createAffiliateLinkDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    description: "List of all affiliate links",
    type: [AffiliateLink],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate links",
  })
  findAll() {
    return this.affiliateLinksService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the affiliate link",
    type: "number",
  })
  @ApiOkResponse({
    description: "Affiliate link found successfully",
    type: AffiliateLink,
  })
  @ApiNotFoundResponse({ description: "Affiliate link not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate link",
  })
  findOne(@Param("id") id: string) {
    return this.affiliateLinksService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the affiliate link",
    type: "number",
  })
  @ApiBody({ type: UpdateAffiliateLinkDto })
  @ApiOkResponse({
    description: "Affiliate link updated successfully",
    type: AffiliateLink,
  })
  @ApiNotFoundResponse({ description: "Affiliate link not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update affiliate link",
  })
  update(
    @Param("id") id: string,
    @Body() updateAffiliateLinkDto: UpdateAffiliateLinkDto,
    @Req() request: Request,
  ) {
    return this.affiliateLinksService.update(
      +id,
      updateAffiliateLinkDto,
      request.user.id,
    );
  }

  @Delete(":id")
  @Roles(UserRole.USER)
  @ApiParam({
    name: "id",
    description: "ID of the affiliate link",
    type: "number",
  })
  @ApiOkResponse({ description: "Affiliate link deleted successfully" })
  @ApiNotFoundResponse({ description: "Affiliate link not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete affiliate link",
  })
  remove(@Param("id") id: string, @Req() request: Request) {
    return this.affiliateLinksService.remove(+id, request.user.id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of affiliate links matching the search query",
    type: [AffiliateLink],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search affiliate links",
  })
  searchAffiliateLinks(@Query("query") query: string) {
    return this.affiliateLinksService.searchAffiliateLinks(query);
  }

  @Get("user/:userId")
  @ApiParam({ name: "userId", description: "ID of the user", type: "number" })
  @ApiOkResponse({
    description: "List of affiliate links for the user",
    type: [AffiliateLink],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate links for the user",
  })
  findByUser(@Param("userId") userId: string) {
    return this.affiliateLinksService.findByUser(+userId);
  }

  @Get("program/:programId")
  @ApiParam({
    name: "programId",
    description: "ID of the affiliate program",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of affiliate links for the program",
    type: [AffiliateLink],
  })
  @ApiNotFoundResponse({ description: "Affiliate program not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate links for the program",
  })
  findByProgram(@Param("programId") programId: string) {
    return this.affiliateLinksService.findByProgram(+programId);
  }
}
