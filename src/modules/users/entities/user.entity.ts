import { StateEnum } from 'src/common/enum/state.enum';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
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

  @Column({
    type: 'enum',
    default: StateEnum.Active,
    enum: StateEnum,
  })
  state: StateEnum;
}