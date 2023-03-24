import { AuditBase } from "src/modules/shared/bases/auditBase";
import { Tenant } from "src/modules/tenant/entities/tenant.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role extends AuditBase {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @OneToOne(() => Tenant)
    @JoinColumn()
    tenant: Tenant
}