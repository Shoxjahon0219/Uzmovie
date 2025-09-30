import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully." })
  @ApiResponse({ status: 409, description: "User already exists" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of users" })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, description: "User details" })
  @ApiResponse({ status: 404, description: "User not found" })
  findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user by ID" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user by ID" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.adminService.remove(id);
  }
}
