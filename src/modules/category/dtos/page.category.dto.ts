import { DtoValidation } from '@/modules/core/decorators/dto-validation.decorator';
import { PaginateOptions } from '@/modules/database/types';
import { isString, toNumber } from 'lodash';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

@DtoValidation()
export class PageCategorydto implements PaginateOptions {
  @IsString()
  @IsOptional()
  name: string;

  @Transform(({ value }) => (isString(value) ? toNumber(value) : value))
  @IsNumber()
  @IsOptional()
  online: number;
  /**
   * 当前页
   */
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  /**
   * 每页数据量
   */
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于1' })
  @IsNumber()
  @IsOptional()
  limit?: number = 10;
}
