import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({})
  @IsString({ message: 'o campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  name!: string;

  @ApiProperty({})
  @IsString({ message: 'o campo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  username!: string;

  @ApiProperty({})
  @IsString({ message: 'o campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  password!: string;

  @ApiProperty({})
  @IsNumber({}, { message: 'o campo class_id deve ser um número' })
  @IsNotEmpty({ message: 'O campo class_id é obrigatório' })
  @Type(() => Number)
  class_id!: number;
}
