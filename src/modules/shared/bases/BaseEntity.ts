import { Column, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { AuditBase } from './auditBase';

export class BaseEntity extends AuditBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  @Generated('uuid')
  uuid: string;
}
