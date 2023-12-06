/**
 * @Project : backend-nest
 * @File : update-check-point.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/20/2023
 * @Time : 10:25 AM
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckPointDto } from './create-check-point.dto';
import { ObjectId } from 'mongodb';
import { IsNotEmpty } from 'class-validator';

export class UpdateCheckPointDto extends PartialType(CreateCheckPointDto) {
  @IsNotEmpty()
  readonly id: ObjectId;
}
