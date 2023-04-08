import { Tenant } from "src/modules/tenant/entities/tenant.entity";
import { JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export class TenantBase extends BaseEntity {
    @ManyToOne(() => Tenant, { nullable: false })
    @JoinColumn()
    tenant: Tenant
}