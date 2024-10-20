import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UserRole } from "src/shared/constants/roles";
import { RolesGuard, Roles } from "src/shared/guards/roles.guards";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { EmployeeService } from "./employee.service";

@ApiTags("Employee")
@ApiBearerAuth()
@Controller("employee")
@UseGuards(AuthGuard, RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Roles(UserRole.ADMIN) // Seuls les admins peuvent créer des employés
  @ApiOperation({ summary: "Create a new employee" })
  @ApiCreatedResponse({ description: "Employee created successfully" })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @Roles(UserRole.ADMIN) // Seuls les admins peuvent voir tous les employés
  @ApiOperation({ summary: "Get all employees" })
  @ApiOkResponse({ description: "List of employees" })
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(":id")
  @Roles(UserRole.ADMIN) // Seuls les admins peuvent voir un employé par ID
  @ApiOperation({ summary: "Get an employee by ID" })
  @ApiOkResponse({ description: "Employee found" })
  @ApiNotFoundResponse({ description: "Employee not found" })
  findOne(@Param("id") id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(":id")
  @Roles(UserRole.ADMIN) // Seuls les admins peuvent modifier un employé
  @ApiOperation({ summary: "Update an employee" })
  @ApiOkResponse({ description: "Employee updated successfully" })
  @ApiNotFoundResponse({ description: "Employee not found" })
  update(
    @Param("id") id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN) // Seuls les admins peuvent supprimer un employé
  @ApiOperation({ summary: "Delete an employee" })
  @ApiOkResponse({ description: "Employee deleted successfully" })
  @ApiNotFoundResponse({ description: "Employee not found" })
  remove(@Param("id") id: string) {
    return this.employeeService.remove(+id);
  }

  @Get("search")
  @Roles(UserRole.ADMIN) // Seuls les admins peuvent rechercher des employés
  @ApiOperation({ summary: "Search employees" })
  @ApiOkResponse({
    description: "List of employees matching the search criteria",
  })
  searchEmployees(@Query("query") query: string) {
    return this.employeeService.searchEmployees(query);
  }
}
