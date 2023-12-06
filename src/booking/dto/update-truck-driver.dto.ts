/**
 * @Project : backend-nest
 * @File : update-truck-driver.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/25/2023
 * @Time : 10:16 AM
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTruckDriverDto } from './create-truck-driver.dto';

export class UpdateTruckDriverDto extends PartialType(CreateTruckDriverDto) {}
