import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateActDto {
  @ApiProperty()
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name!: string;
  @ApiProperty()
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  description!: string;
  @ApiProperty()
  @IsDate({ message: 'deadline must be a date' })
  @Type(() => Date)
  deadline!: Date;
  @ApiProperty()
  @IsNumber({}, { message: 'xp_reward must be a number' })
  @Type(() => Number)
  xp_reward!: number;
  @ApiProperty()
  @IsNumber({}, { message: 'gold_reward must be a number' })
  @Type(() => Number)
  gold_reward!: number;
  @ApiProperty()
  @IsNumber({}, { message: 'player_id must be a number' })
  @Type(() => Number)
  player_id!: number;
}
