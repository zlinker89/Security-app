import { StateEnum } from 'src/common/enum/state.enum';
import { TypeApp } from 'src/common/enum/typeApp.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    default: TypeApp.Web,
    enum: TypeApp,
  })
  typeApp: TypeApp;

  @Column({
    type: 'enum',
    default: StateEnum.Active,
    enum: StateEnum,
  })
  state: StateEnum;
}
