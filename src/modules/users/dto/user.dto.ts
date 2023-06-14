import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";
import { TenantBaseDto } from "src/modules/shared/bases/dto/TenantBase.dto";

export class UserDto extends TenantBaseDto {
  @ApiProperty({
    maxLength:150
  })
  @IsString()
  userName: string;

  @ApiProperty({
    maxLength:150
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsNumber()
  roleId: number;
}