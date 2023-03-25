import { TenantBase } from "src/modules/shared/bases/TenantBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Role extends TenantBase {

    @Column()
    name: string;
}