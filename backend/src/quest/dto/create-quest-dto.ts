import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQuestDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  userId!: number;

  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  actId?: number;

  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  skillTreeId?: number;

  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  buffId?: number;

  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  typeId!: number;

  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  complexity!: number;

  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  xp_reward!: number;

  @ApiProperty({})
  @IsDate()
  @Type(() => Date)
  dateInicio!: Date;

  @ApiProperty({})
  @IsDate()
  @Type(() => Date)
  dateFim!: Date;

  @ApiProperty({})
  @IsBoolean()
  @Type(() => Boolean)
  concluded!: boolean;
}
