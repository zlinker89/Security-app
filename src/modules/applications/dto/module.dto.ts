import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { StateEnum } from "src/common/enum";

export class ModuleDto {
  @ApiProperty()
  @IsOptional()
  id?: number;
  
  @ApiProperty({
    maxLength:150
  })
  @IsString()
  name: string;

  @ApiProperty({
    maxLength:100
  })
  @IsString()
  icon: string;

  @ApiProperty({ enum: StateEnum, default: StateEnum.ACTIVE})
  @IsEnum(StateEnum)
  @IsOptional()
  state?: StateEnum;

  @ApiProperty()
  @IsNumber()
  tenantId: number;

  @ApiProperty()
  @IsNumber()
  applicationId: number;
}