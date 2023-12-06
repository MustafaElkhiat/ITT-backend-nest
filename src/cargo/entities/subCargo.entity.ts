/**
 * @Project : backend-nest
 * @File : src/cargo/entities/subCargo.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/17/2023
 * @Time : 11:47 AM
 */
import { Column } from 'typeorm';

export class SubCargo {
  @Column()
  name: string;
  @Column({ unique: true })
  code: string;
}
