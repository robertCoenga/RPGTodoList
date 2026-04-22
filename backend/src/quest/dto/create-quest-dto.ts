import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Type(() => Number)
  userId: number;

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
}
