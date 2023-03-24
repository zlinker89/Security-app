import { StateEnum } from "src/common/enum/state.enum";
import { Tenant } from "src/modules/tenant/entities/tenant.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @OneToOne(() => Tenant)
    @JoinColumn()
    tenant: Tenant
  
    @Column({
      type: 'enum',
      default: StateEnum.Active,
      enum: StateEnum,
    })
    state: StateEnum;
}