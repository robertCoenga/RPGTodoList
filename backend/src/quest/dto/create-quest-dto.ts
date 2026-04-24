import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQuestDto {
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Type(() => Number)
  userId!: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  actId?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  skillTreeId?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  buffId?: number;

  @IsNumber()
  @Type(() => Number)
  typeId!: number;

  @IsNumber()
  @Type(() => Number)
  complexity!: number;

  @IsNumber()
  @Type(() => Number)
  xp_reward!: number;

  @IsDate()
  @Type(() => Date)
  dateInicio!: Date;

  @IsDate()
  @Type(() => Date)
  dateFim!: Date;

  @IsBoolean()
  @Type(() => Boolean)
  concluded!: boolean;
}
