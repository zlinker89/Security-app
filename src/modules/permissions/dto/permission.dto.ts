import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { TenantBaseDto } from "src/modules/shared/bases/dto/TenantBase.dto";

export class PermissionDto extends TenantBaseDto {
  @ApiProperty({
    maxLength:150
  })
  @IsString()
  name: string;

  @ApiProperty({
    maxLength:150
  })
  @IsString()
  ability: string;

  @ApiProperty()
  @IsBoolean()
  isGlobal: boolean;

  @ApiProperty()
  @IsNumber()
  moduleId: number;
}