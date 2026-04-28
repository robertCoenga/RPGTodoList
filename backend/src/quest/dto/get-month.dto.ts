import { IsInt, Max, Min } from 'class-validator';

export class GetCalendarMonthDto {
  @IsInt()
  player_id!: number;
  @IsInt()
  year!: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month!: number;
}
