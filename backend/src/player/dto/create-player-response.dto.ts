import { IsNumber, IsString } from 'class-validator';

export class CreatePlayerResponseDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsNumber()
  level: number;
  @IsNumber()
  xp: number;
  @IsNumber()
  gold: number;
  @IsString()
  class: string;
}
