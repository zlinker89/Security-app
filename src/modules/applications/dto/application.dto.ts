import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { StateEnum, TypeApp } from "src/common/enum";

export class ApplicationDto {
  @ApiProperty()
  @IsOptional()
  id?: number;
  
  @ApiProperty({
    maxLength:150
  })
  @IsString()
  name: string;

  @ApiProperty({ enum: TypeApp, default: TypeApp.WEB})
  @IsEnum(TypeApp)
  @IsOptional()
  typeApp: TypeApp;

  @ApiProperty({ enum: StateEnum, default: StateEnum.ACTIVE})
  @IsEnum(StateEnum)
  @IsOptional()
  state?: StateEnum;

  @ApiProperty()
  @IsNumber()
  tenantId: number;
}