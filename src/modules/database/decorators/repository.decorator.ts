// src/modules/database/decorators/repository.decorator.ts
import { ObjectType } from 'typeorm';
import { SetMetadata } from '@nestjs/common';
import { CUSTOM_REPOSITORY_METADATA } from '../constants';

export const CustomRepository = <T>(entity: ObjectType<T>): ClassDecorator =>
  SetMetadata(CUSTOM_REPOSITORY_METADATA, entity);
