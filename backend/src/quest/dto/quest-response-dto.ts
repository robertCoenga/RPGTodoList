import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class QuestResponseDto {
  @IsNumber()
  @Type(() => Number)
  id!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsNumber()
  @Type(() => Number)
  type_id!: number;

  @IsNumber()
  @Type(() => Number)
  complexity!: number;

  @IsNumber()
  @Type(() => Number)
  xp_reward!: number;

  @IsDate()
  @Type(() => Date)
  data_inicio!: Date;

  @IsDate()
  @Type(() => Date)
  data_fim!: Date;

  @IsBoolean()
  @Type(() => Boolean)
  concluded!: boolean;

  @IsDate()
  @Type(() => Date)
  created_at!: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updated_at?: Date;
}
