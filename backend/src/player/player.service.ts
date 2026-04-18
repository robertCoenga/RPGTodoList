import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerResponseDto } from './dto/create-player-response.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { DeletePlayerResponseDto } from './dto/delete-player-response.dto';

@Injectable()
export class PlayerService {
  constructor(private prismaService: PrismaService) {}

  async getPlayerById(id: number): Promise<CreatePlayerResponseDto> {
    const player = await this.prismaService.player.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        level: true,
        xp: true,
        gold: true,
        class_id: true,
        created_at: true,
        updated_at: true,
      },
    });
    return { ...player };
  }

  async createPlayer(
    player: CreatePlayerDto,
  ): Promise<CreatePlayerResponseDto> {
    const createdPlayer = await this.prismaService.player.create({
      data: {
        name: player.name,
        username: player.username,
        password: player.password,
        level: player.level,
        xp: player.xp,
        gold: player.gold,
        class_id: player.class_id,
        status: {
          focus: 1,
          health: 1,
          energy: 1,
          level: 1,
          xp: 0,
          gold: 0,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        level: true,
        xp: true,
        gold: true,
        class_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    return { ...createdPlayer };
  }

  async updatePlayer(
    playerId: number,
    updateData: any,
  ): Promise<CreatePlayerResponseDto> {
    const updatedPlayer = await this.getPlayerById(playerId);

    if (!updatedPlayer) {
      throw new Error('Player not found');
    }
    const player = await this.prismaService.player.update({
      where: { id: playerId },
      data: {
        ...updateData,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        username: true,
        level: true,
        xp: true,
        gold: true,
        class_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    return { ...player };
  }

  async deletePlayer(playerId: number): Promise<DeletePlayerResponseDto> {
    return {
      message: 'Player deleted successfully',
      id: playerId,
    };
  }
}
