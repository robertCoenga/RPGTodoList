import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeletePlayerResponseDto {
  @IsString({ message: 'o campo deve ser uma string' })
  @IsNotEmpty({ message: 'A mensagem é obrigatória' })
  message: string;
  @IsNumber({ message: 'o campo deve ser um número' })
  @IsNotEmpty({ message: 'O ID é obrigatório' })
  id: number;
}
