import { StateEnum } from 'src/common/enum/state.enum';
import { Column } from 'typeorm';

export class AuditBase {
  @Column({
    type: 'enum',
    default: StateEnum.ACTIVE,
    enum: StateEnum,
  })
  state: StateEnum;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) // TODO: refactor to config.env
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "ON UPDATE CURRENT_TIMESTAMP" }) // TODO: refactor to config.env
  updatedAt: Date;
}
