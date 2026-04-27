import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetActDto {
  @IsNumber({}, { message: 'actId must be a number' })
  @Type(() => Number)
  @IsOptional()
  id?: number;
  @IsNumber({}, { message: 'player_id must be a number' })
  @Type(() => Number)
  @IsOptional()
  player_id?: number;
}
