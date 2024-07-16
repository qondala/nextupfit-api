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
import { AffiliateSale } from "../../entities/affiliate-sale.entity";
import { UserRole } from "../../shared/constants/roles";
import { RolesGuard, Roles } from "../../shared/guards/roles.guards";
import { AffiliateSalesService } from "./affiliatesales.service";
import { CreateAffiliateSaleDto } from "./dto/create-affiliate-sale.dto";
import { UpdateAffiliateSaleDto } from "./dto/update-affiliate-sale.dto";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";

@ApiTags("AffiliateSales")
@ApiBearerAuth()
@Controller("affiliate-sales")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AffiliateSalesController {
  constructor(private readonly affiliateSalesService: AffiliateSalesService) {}

  @Post()
  @Roles(UserRole.ADMIN) // On suppose que seul l'administrateur peut créer des ventes d'affiliation
  @ApiBody({ type: CreateAffiliateSaleDto })
  @ApiCreatedResponse({
    description: "Affiliate sale created successfully",
    type: AffiliateSale,
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to create affiliate sale",
  })
  create(@Body() createAffiliateSaleDto: CreateAffiliateSaleDto) {
    return this.affiliateSalesService.create(createAffiliateSaleDto);
  }

  @Get()
  @ApiOkResponse({
    description: "List of all affiliate sales",
    type: [AffiliateSale],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate sales",
  })
  findAll() {
    return this.affiliateSalesService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "ID of the affiliate sale",
    type: "number",
  })
  @ApiOkResponse({
    description: "Affiliate sale found successfully",
    type: AffiliateSale,
  })
  @ApiNotFoundResponse({ description: "Affiliate sale not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate sale",
  })
  findOne(@Param("id") id: string) {
    return this.affiliateSalesService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.ADMIN) // On suppose que seul l'administrateur peut mettre à jour des ventes d'affiliation
  @ApiParam({
    name: "id",
    description: "ID of the affiliate sale",
    type: "number",
  })
  @ApiBody({ type: UpdateAffiliateSaleDto })
  @ApiOkResponse({
    description: "Affiliate sale updated successfully",
    type: AffiliateSale,
  })
  @ApiNotFoundResponse({ description: "Affiliate sale not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to update affiliate sale",
  })
  update(
    @Param("id") id: string,
    @Body() updateAffiliateSaleDto: UpdateAffiliateSaleDto,
  ) {
    return this.affiliateSalesService.update(+id, updateAffiliateSaleDto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN) // On suppose que seul l'administrateur peut supprimer des ventes d'affiliation
  @ApiParam({
    name: "id",
    description: "ID of the affiliate sale",
    type: "number",
  })
  @ApiOkResponse({ description: "Affiliate sale deleted successfully" })
  @ApiNotFoundResponse({ description: "Affiliate sale not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to delete affiliate sale",
  })
  remove(@Param("id") id: string) {
    return this.affiliateSalesService.remove(+id);
  }

  @Get("search")
  @ApiQuery({ name: "query", description: "Search query", required: true })
  @ApiOkResponse({
    description: "List of affiliate sales matching the search query",
    type: [AffiliateSale],
  })
  @ApiInternalServerErrorResponse({
    description: "Failed to search affiliate sales",
  })
  searchAffiliateSales(@Query("query") query: string) {
    return this.affiliateSalesService.searchAffiliateSales(query);
  }

  @Get("link/:linkId")
  @ApiParam({
    name: "linkId",
    description: "ID of the affiliate link",
    type: "number",
  })
  @ApiOkResponse({
    description: "List of affiliate sales for the link",
    type: [AffiliateSale],
  })
  @ApiNotFoundResponse({ description: "Affiliate link not found" })
  @ApiInternalServerErrorResponse({
    description: "Failed to fetch affiliate sales for the link",
  })
  findByLink(@Param("linkId") linkId: string) {
    return this.affiliateSalesService.findByLink(+linkId);
  }
}
