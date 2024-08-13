import { DtoValidation } from '@/modules/core/decorators/dto-validation.decorator';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CategoryStatus } from '@/modules/content/constants';

@DtoValidation()
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsEnum(CategoryStatus)
  @IsNotEmpty()
  online: CategoryStatus;

  @IsNumber()
  @IsNotEmpty()
  index: number;

  @IsUUID()
  @IsString()
  @IsOptional()
  parent: string;
}
