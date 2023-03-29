import { BaseEntity } from './../../shared/bases/BaseEntity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Tenant extends BaseEntity {
  @Column({
    length: 150
  })
  name: string;
}