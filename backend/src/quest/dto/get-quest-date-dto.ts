import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class GetQuestDateDto {
  @IsNumber({}, { message: 'playerId must be a number' })
  @Type(() => Number)
  playerId!: number;

  @IsDate({ message: 'questDate must be a valid date' })
  @Type(() => Date)
  questDate!: Date;
}
