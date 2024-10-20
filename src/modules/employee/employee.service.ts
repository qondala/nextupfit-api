import { NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Not, Repository } from "typeorm";
import * as argon2 from "argon2";
import { User } from "src/entities/user.entity";
import { Employee } from "src/entities/employee.entity";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

export class EmployeeService {
  constructor(
    private usersRepository: Repository<User>,
    @InjectRepository(Employee)
    private EmployeesRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const existingEmployee = await this.usersRepository.findOne({
      where: { email: createEmployeeDto.email },
    });
    if (existingEmployee) {
      throw new BadRequestException("Employee with this email already exists");
    }
    const passwordHash = await argon2.hash(createEmployeeDto.password);

    const user = this.usersRepository.create({
      ...createEmployeeDto,
      passwordHash,
    });
    return this.EmployeesRepository.create({ user });
  }

  async findAll(): Promise<Employee[]> {
    return await this.EmployeesRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.EmployeesRepository.findOne({
      where: { id },
    });

    if (!Employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const user = await this.usersRepository.findOneBy({ employee: { id } });
    if (!user) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Update the Employee's data
    Object.assign(user, updateEmployeeDto);

    // If a new password is provided, hash it
    if (updateEmployeeDto.password) {
      user.passwordHash = await argon2.hash(updateEmployeeDto.password);
    }

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const Employee = await this.findOne(id);
    if (!Employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    await this.EmployeesRepository.remove(Employee);
  }

  async searchEmployees(query: string): Promise<Employee[]> {
    const users = await this.usersRepository.find({
      where: [
        { firstName: Like(`%${query}%`) },
        { lastName: Like(`%${query}%`) },
        { email: Like(`%${query}%`) },
        { employee: Not(null) },
      ],
      relations: ["Employee"],
    });
    return users.map((u) => u.employee);
  }
}
