import { BaseEntity } from './../../shared/bases/BaseEntity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Tenant extends BaseEntity {
  @Column()
  name: string;
}