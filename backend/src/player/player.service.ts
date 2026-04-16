import { Injectable } from '@nestjs/common';
import { CreatePlayerResponseDto } from './dto/create-player-response.dto';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayerService {
  async getPlayer(): Promise<any> {}

  async createPlayer(
    player: CreatePlayerDto,
  ): Promise<CreatePlayerResponseDto> {
    return new CreatePlayerResponseDto();
  }

  async updatePlayer(playerId: string, updateData: any): Promise<any> {}

  async deletePlayer(playerId: string): Promise<void> {}
}
