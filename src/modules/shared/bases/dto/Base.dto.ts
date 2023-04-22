import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AuditDto } from './Audit.dto';

export class BaseDto extends AuditDto {
  @ApiProperty()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  uuid: string;
}
