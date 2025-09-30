import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const existUser = await this.adminRepository.findOne({
      where: { login: createAdminDto.login },
    });

    if (existUser) {
      throw new ConflictException("Login already exists");
    }

    const admin = this.adminRepository.create(createAdminDto);
    return await this.adminRepository.save(admin);
  }

  findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: string) {
    const admin = await this.adminRepository.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }
    const existUser = await this.adminRepository.findOne({
      where: { login: updateAdminDto.login },
    });

    if (existUser) {
      throw new ConflictException("Login already exists");
    }

    await this.adminRepository.update(id, updateAdminDto);
    return this.adminRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const admin = await this.adminRepository.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }

    return this.adminRepository.delete({ id });
  }
}
