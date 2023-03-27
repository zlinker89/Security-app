import { Type } from '@nestjs/class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

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
  readonly criteriaSearch?;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly search?;

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
