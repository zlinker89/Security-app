import { TypeOption } from 'src/common/enum';
import { TenantBase } from 'src/modules/shared/bases/TenantBase';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Application } from './application.entity';

@Entity()
export class Menu extends TenantBase {

  @Column({ 
    nullable: false,
    length: 100
   })
  label: string;

  @Column({ 
    nullable: false,
    length: 50
   })
  icon: string;

  @Column({ 
    nullable: false,
    length: 200
   })
  routerLink: string;
   
  @Column({
    type: 'enum',
    default: TypeOption.INTERNAL,
    enum: TypeOption,
  })
  typeOption: TypeOption;

  @OneToOne(() => Menu, { nullable: false })
  @JoinColumn()
  menu: Menu
}