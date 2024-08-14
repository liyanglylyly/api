import { DtoValidation } from '@/modules/core/decorators/dto-validation.decorator';
import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from '@/modules/category/dtos';
import { IsNotEmpty, IsUUID } from 'class-validator';

@DtoValidation()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
