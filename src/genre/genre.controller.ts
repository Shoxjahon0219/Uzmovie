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
import { GenreService } from "./genre.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("genre")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiOperation({ summary: "Create a new genre" })
  @ApiResponse({ status: 201, description: "Genre created successfully." })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all genres" })
  @ApiResponse({ status: 200, description: "List of genres" })
  findAll() {
    return this.genreService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get genre by id" })
  @ApiResponse({ status: 200, description: "Get one genre by ID" })
  @ApiResponse({ status: 404, description: "Genre not found" })
  findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.genreService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update genre by id" })
  @ApiResponse({ status: 200, description: "Update one genre by ID" })
  @ApiResponse({ status: 404, description: "Genre not found" })
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateGenreDto: UpdateGenreDto
  ) {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Update genre by id" })
  @ApiResponse({ status: 200, description: "Delete one genre by ID" })
  @ApiResponse({ status: 404, description: "Genre not found" })
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.genreService.remove(id);
  }
}
