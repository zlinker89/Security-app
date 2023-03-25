import { StateEnum } from 'src/common/enum/state.enum';
import { Column } from 'typeorm';

export class AuditBase {
  @Column({
    type: 'enum',
    default: StateEnum.Active,
    enum: StateEnum,
  })
  state: StateEnum;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "ON UPDATE CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
