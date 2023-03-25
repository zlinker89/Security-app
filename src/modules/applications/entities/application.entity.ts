import { TypeApp } from 'src/common/enum/typeApp.enum';
import { TenantBase } from 'src/modules/shared/bases/TenantBase';
import { Column, Entity } from 'typeorm';

@Entity()
export class Application extends TenantBase {

  @Column()
  name: string;

  @Column({
    type: 'enum',
    default: TypeApp.WEB,
    enum: TypeApp,
  })
  typeApp: TypeApp;
}
