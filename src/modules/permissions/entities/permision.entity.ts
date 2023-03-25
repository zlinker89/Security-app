import { TenantBase } from "src/modules/shared/bases/TenantBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Permission extends TenantBase {

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 100
    })
    ability: string;

    @Column({
        default: false
    })
    isGlobal: boolean;
}