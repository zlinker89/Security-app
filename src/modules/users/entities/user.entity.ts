import { Role } from 'src/modules/roles/entities/role.entity';
import { TenantBase } from 'src/modules/shared/bases/TenantBase';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class User extends TenantBase {
  @Column()
  userName: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, { nullable: false })
  @JoinColumn()
  role: Role
}
