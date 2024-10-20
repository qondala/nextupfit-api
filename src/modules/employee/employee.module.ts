import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importer les entités nécessaires
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
