import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from '@/modules/category/services';
import { CreateCategoryDto, PageCategorydto } from '@/modules/category/dtos';
import { UpdateCategoryDto } from '@/modules/category/dtos';

@Controller('category')
export class CategoryController {
  constructor(protected service: CategoryService) {}

  @Post()
  async create(@Body() data: CreateCategoryDto) {
    return this.service.create(data);
  }

  @Get('/detail/:id')
  async detail(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.service.detail(id);
  }

  @Delete(':id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.service.delete([id]);
  }

  @Post('page')
  async page(@Body() dto: PageCategorydto) {
    return await this.service.paginate(dto);
  }

  @Get('/full')
  async fullList() {
    return await this.page({} as PageCategorydto);
  }

  @Patch()
  async update(@Body() dto: UpdateCategoryDto) {
    return await this.service.update(dto);
  }
}
