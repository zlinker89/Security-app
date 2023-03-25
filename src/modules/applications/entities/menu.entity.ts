import { TenantBase } from 'src/modules/shared/bases/TenantBase';
import { Column, Entity } from 'typeorm';

@Entity()
export class Menu extends TenantBase {

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  icon: string;
}