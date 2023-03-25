import { Role } from 'src/modules/roles/entities/role.entity';
import { TenantBase } from 'src/modules/shared/bases/TenantBase';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User extends TenantBase {
  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToOne(() => Role, { nullable: false })
  @JoinColumn()
  role: Role
}
