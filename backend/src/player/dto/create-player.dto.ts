import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({})
  @IsString({ message: 'o campo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  name: string;
  @ApiProperty({})
  @IsString({ message: 'o campo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  username: string;
  @ApiProperty({})
  @IsString({ message: 'o campo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  password: string;
  @ApiProperty({})
  @IsString({ message: 'o campo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  level: number;
  @ApiProperty({})
  @IsString({ message: 'o campo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  xp: number;
  @ApiProperty({})
  @IsString({ message: 'o campo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  gold: number;
  @ApiProperty({})
  @IsString({ message: 'o campo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  class_id: number;
}
