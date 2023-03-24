import { StateEnum } from 'src/common/enum/state.enum';
import { TypeApp } from 'src/common/enum/typeApp.enum';
import { AuditBase } from 'src/modules/shared/bases/auditBase';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application extends AuditBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant

  @Column({
    type: 'enum',
    default: TypeApp.Web,
    enum: TypeApp,
  })
  typeApp: TypeApp;
}
