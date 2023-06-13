import { MenuOption } from 'src/modules/applications/entities/menuOption.entity';
import { Permission } from 'src/modules/permissions/entities/permision.entity';
import { TenantBase } from 'src/modules/shared/bases/TenantBase';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Role extends TenantBase {
  @Column()
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => MenuOption)
  @JoinTable()
  menuOptions: MenuOption[];
}
