import { StateEnum } from 'src/common/enum/state.enum';
import { AuditBase } from 'src/modules/shared/bases/auditBase';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tenant extends AuditBase {
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