import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { TenantBaseDto } from "src/modules/shared/bases/dto/TenantBase.dto";

export class RoleDto extends TenantBaseDto {
  @ApiProperty({
    maxLength:150
  })
  @IsString()
  name: string;
}