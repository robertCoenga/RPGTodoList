import { IsNumber, IsObject, IsString } from 'class-validator';
import { ClassDto } from './info/class.dto';
import { PlayerStatusDto } from './info/player-status.dto';

export class CreatePlayerResponseDto {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  username!: string;

  @IsObject()
  class!: ClassDto;

  @IsObject()
  status!: PlayerStatusDto;
}
