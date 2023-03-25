import { Tenant } from "src/modules/tenant/entities/tenant.entity";
import { JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export class TenantBase extends BaseEntity {
    @OneToOne(() => Tenant, { nullable: false })
    @JoinColumn()
    tenant: Tenant
}