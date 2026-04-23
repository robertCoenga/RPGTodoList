import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { CreatePlayerResponseDto } from './dto/create-player-response.dto';

@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get(':id')
  async getPlayerById(@Param('id') id: number) {
    try {
      return this.playerService.getPlayerById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Post('create')
  async createPlayer(@Body('createPlayer') createPlayer: CreatePlayerDto): Promise<CreatePlayerResponseDto> {
    try {
      return this.playerService.createPlayer(createPlayer);
    } catch (error) {
       throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
  
  @Put('update/:id')
  async updatePlayer(@Param('id') id: number, @Body('updatePlayer') updatePlayer: CreatePlayerDto): Promise<CreatePlayerResponseDto> {
    try {
      return this.playerService.createPlayer(updatePlayer);
    } catch (error) {
      
    }
  }
}
