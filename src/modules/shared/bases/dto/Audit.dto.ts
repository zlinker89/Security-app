import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { StateEnum } from 'src/common/enum';

export class AuditDto {
  @ApiProperty({ enum: StateEnum, default: StateEnum.ACTIVE })
  @IsEnum(StateEnum)
  @IsOptional()
  state?: StateEnum;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;
}
