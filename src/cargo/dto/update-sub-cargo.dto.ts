/**
 * @Project : backend-nest
 * @File : src/cargo/dto/create-sub-cargo.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/17/2023
 * @Time : 4:07 PM
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCargoDto } from './create-sub-cargo.dto';

export class UpdateSubCargoDto extends PartialType(CreateSubCargoDto) {}
