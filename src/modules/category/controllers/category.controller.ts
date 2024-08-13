import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from '@/modules/category/services';
import { CreateCategoryDto } from '@/modules/category/dtos';

@Controller('category')
export class CategoryController {
  constructor(protected service: CategoryService) {}

  @Post()
  async create(@Body() data: CreateCategoryDto) {
    return this.service.create(data);
  }
}
