import { PartialType } from '@nestjs/mapped-types';
import { CreateBerthDto } from './create-berth.dto';

export class UpdateBerthDto extends PartialType(CreateBerthDto) {}
