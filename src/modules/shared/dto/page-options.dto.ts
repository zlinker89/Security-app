import { Type } from '@nestjs/class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { TypeFilter } from 'src/common/enum';

export interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}
export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class PageOptionsDto {
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly criteriaSearch?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly search?: string;

  @ApiPropertyOptional({ enum: TypeFilter, default: TypeFilter.APPROX })
  @IsEnum(TypeFilter)
  @IsOptional()
  readonly typeFilter?: TypeFilter = TypeFilter.APPROX;
  
  @ApiProperty({
    default: 'CreatedAt'
  })
  @IsString()
  readonly columnToSort?: string = 'CreatedAt';
  
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
