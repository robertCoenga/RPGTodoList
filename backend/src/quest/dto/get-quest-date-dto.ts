import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetQuestDateDto {
  @IsDate({ message: 'questDate must be a valid date' })
  @Type(() => Date)
  questDate: Date;
}
