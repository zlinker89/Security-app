import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { BaseDto } from "./Base.dto";

export class TenantBaseDto extends BaseDto {
  @ApiProperty()
  @IsNumber()
  tenantId: number;
}
