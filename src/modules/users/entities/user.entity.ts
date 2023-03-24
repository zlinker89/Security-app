import { StateEnum } from 'src/common/enum/state.enum';
import { Role } from 'src/modules/roles/entities/role.entity';
import { AuditBase } from 'src/modules/shared/bases/auditBase';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User extends AuditBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role
}
