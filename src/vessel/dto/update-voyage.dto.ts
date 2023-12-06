/**
 * @Project : backend-nest
 * @File : update-voyage.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/18/2023
 * @Time : 5:10 PM
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateVoyageDto } from './create-voyage.dto';

export class UpdateVoyageDto extends PartialType(CreateVoyageDto) {}
