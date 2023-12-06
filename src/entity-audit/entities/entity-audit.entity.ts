/**
 * @Project : backend-nest
 * @File : src/entity-audit/entities/entity-audit.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/16/2023
 * @Time : 11:39 AM
 */
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class EntityAudit {
  @CreateDateColumn({ type: 'string' })
  createdAt?: string;

  @UpdateDateColumn({ type: 'string' })
  editedAt?: string;
  @Column({ default: 'Anonymous' })
  createdBy?: string;

  @Column()
  editedBy?: string;
}
