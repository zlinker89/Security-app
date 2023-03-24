import { StateEnum } from 'src/common/enum/state.enum';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AuditBase {
  @Column({
    type: 'enum',
    default: StateEnum.Active,
    enum: StateEnum,
  })
  state: StateEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
