import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { StateEnum } from "src/common/enum";

export class TenantDto {
  @ApiProperty()
  @IsOptional()
  id?: number;
  
  @ApiProperty({
    maxLength:150
  })
  @IsString()
  name: string;

  @ApiProperty({ enum: StateEnum, default: StateEnum.ACTIVE})
  @IsEnum(StateEnum)
  @IsOptional()
  state?: StateEnum;
}