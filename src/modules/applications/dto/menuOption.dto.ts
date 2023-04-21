import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TypeOption } from "src/common/enum";

export class MenuOptionDto {
  @ApiProperty()
  @IsOptional()
  id?: number;
  
  @ApiProperty({
    maxLength:100
  })
  @IsString()
  label: string;

  @ApiProperty({
    maxLength:50
  })
  @IsString()
  icon: string;

  @ApiProperty({
    maxLength:200
  })
  @IsString()
  routerLink: string;

  @ApiProperty({ enum: TypeOption, default: TypeOption.INTERNAL})
  @IsEnum(TypeOption)
  @IsOptional()
  state?: TypeOption;

  @ApiProperty()
  @IsNumber()
  menuId: number;

  @ApiProperty()
  @IsNumber()
  tenantId: number;

  @ApiProperty()
  @IsNumber()
  applicationId: number;
}