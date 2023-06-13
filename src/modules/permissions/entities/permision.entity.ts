import { Module } from "src/modules/applications/entities/module.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import { TenantBase } from "src/modules/shared/bases/TenantBase";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";

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

    @ManyToOne(() => Module, { nullable: false })
    @JoinColumn()
    module: Module
}