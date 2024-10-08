import { PaginateOptions } from '@/modules/database/types';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

/**
 * 标签分页查询验证
 */
export class QueryTagDto implements PaginateOptions {
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNumber()
  @IsOptional()
  page = 1;

  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于1' })
  @IsNumber()
  @IsOptional()
  limit = 10;
}

/**
 * 标签创建验证
 */
export class CreateTagDto {
  @MaxLength(255, {
    always: true,
    message: '标签名称长度最大为$constraint1',
  })
  @IsNotEmpty({ groups: ['create'], message: '标签名称必须填写' })
  @IsOptional({ groups: ['update'] })
  name: string;

  @MaxLength(500, {
    always: true,
    message: '标签描述长度最大为$constraint1',
  })
  @IsOptional({ always: true })
  description?: string;
}

/**
 * 标签更新验证
 */
export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsUUID(undefined, { groups: ['update'], message: 'ID格式错误' })
  @IsDefined({ groups: ['update'], message: 'ID必须指定' })
  id: string;
}
