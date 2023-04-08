import { Role } from 'src/modules/roles/entities/role.entity';
import { TenantBase } from 'src/modules/shared/bases/TenantBase';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { Application } from './application.entity';

@Entity()
export class Menu extends TenantBase {

  @Column({
    length: 150
  })
  name: string;

  @Column({
    nullable: true,
    length: 100
  })
  icon: string;

  @ManyToOne(() => Application, { nullable: false })
  @JoinColumn()
  application: Application

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]
}