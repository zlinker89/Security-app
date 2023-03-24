import { StateEnum } from 'src/common/enum/state.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    default: StateEnum.Active,
    enum: StateEnum,
  })
  state: StateEnum;
}