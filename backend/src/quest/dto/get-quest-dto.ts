import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetQuestDto {
  @ApiProperty({ description: 'ID da quest' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: "O campo 'projectId' deve ser um numero inteiro" },
  )
  @Type(() => Number)
  id: number;
}
