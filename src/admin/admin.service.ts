import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminModel: Repository<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const admin = this.adminModel.create(createAdminDto);
    return await this.adminModel.save(admin);
  }

  findAll() {
    return this.adminModel.find();
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }

    await this.adminModel.update(id, updateAdminDto);
    return this.adminModel.findOneBy({ id });
  }

  async remove(id: string) {
    const admin = await this.adminModel.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }

    return this.adminModel.delete({ id });
  }
}
