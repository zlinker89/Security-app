import { Role } from "src/modules/roles/entities/role.entity";
import { TenantBase } from "src/modules/shared/bases/TenantBase";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

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

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]
}