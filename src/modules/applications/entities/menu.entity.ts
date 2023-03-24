import { StateEnum } from 'src/common/enum/state.enum';
import { TypeApp } from 'src/common/enum/typeApp.enum';
import { AuditBase } from 'src/modules/shared/bases/auditBase';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu extends AuditBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  icon: string;

  @OneToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant
}