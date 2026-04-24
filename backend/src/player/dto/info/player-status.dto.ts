import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PlayerStatusDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsNumber()
  @Type(() => Number)
  energy!: number;

  @IsNumber()
  @Type(() => Number)
  health!: number;

  @IsNumber()
  @Type(() => Number)
  focus!: number;

  @IsNumber()
  @Type(() => Number)
  level!: number;

  @IsNumber()
  @Type(() => Number)
  xp!: number;

  @IsNumber()
  @Type(() => Number)
  gold!: number;
}
