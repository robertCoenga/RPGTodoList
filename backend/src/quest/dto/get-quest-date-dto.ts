import { IsString } from 'class-validator';

export class GetQuestDateDto {
  @IsString({ message: 'playerId must be a number' })
  playerId!: string;

  @IsString({ message: 'questDate must be a valid date' })
  month!: string;

  @IsString({ message: 'questDate must be a valid date' })
  year!: string;
}
