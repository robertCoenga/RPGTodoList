import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class QuestResponseDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Type(() => Number)
  actId: number?;

  @IsNumber()
  @Type(() => Number)
  skillTreeId: number?;

  @IsNumber()
  @Type(() => Number)
  buffId: number?;

  @IsNumber()
  @Type(() => Number)
  typeId: number;

  @IsNumber()
  @Type(() => Number)
  complexity: number;

  @IsNumber()
  @Type(() => Number)
  xp_reward: number;

  @IsDate()
  @Type(() => Date)
  dateInicio: Date;

  @IsDate()
  @Type(() => Date)
  dateFim: Date;

  @IsBoolean()
  @Type(() => Boolean)
  concluded: boolean;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date?;
}
