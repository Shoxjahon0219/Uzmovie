import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Genre } from "./entities/genre.entity";
import { Repository } from "typeorm";
import { ResData } from "../../lib/resData";

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>
  ) {}
  async create(createGenreDto: CreateGenreDto) {
    const admin = this.genreRepository.create(createGenreDto);
    const newGenre = await this.genreRepository.save(admin);

    return new ResData<Genre>("Genre created successfully", 201, newGenre);
  }

  async findAll() {
    const genre = await this.genreRepository.find();

    return new ResData("Genre retrieved successfully", 200, genre);
  }

  async findOne(id: string) {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`#${id}lik Genre topilmadi`);
    }

    return new ResData("User retrieved by id", 200, genre);
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`#${id}lik Genre topilmadi`);
    }

    const updatedGenre = await this.genreRepository.save({
      ...updateGenreDto,
      id,
    });

    return new ResData("Genre updated by id", 200, updatedGenre);
  }

  async remove(id: string) {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`#${id}lik Genre topilmadi`);
    }

    const deletedGenre = await this.genreRepository.remove(genre);

    return new ResData("Genre deleted successfully", 200, deletedGenre);
  }
}
