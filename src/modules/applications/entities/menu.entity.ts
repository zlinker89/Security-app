import { TenantBase } from 'src/modules/shared/bases/TenantBase';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Application } from './application.entity';

@Entity()
export class Menu extends TenantBase {

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  icon: string;

  @OneToOne(() => Application, { nullable: false })
  @JoinColumn()
  role: Application
}