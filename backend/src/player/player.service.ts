import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerResponseDto } from './dto/create-player-response.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { DeletePlayerResponseDto } from './dto/delete-player-response.dto';
import { ClassDto } from './dto/info/class.dto';
import { PlayerStatusDto } from './dto/info/player-status.dto';
import { TypeClassDto } from './dto/info/type-class.dto';
import { TypesClassDto } from './dto/info/types-class.dto';

@Injectable()
export class PlayerService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPlayerById(id: number): Promise<CreatePlayerResponseDto> {
    const player = await this.prismaService.player.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        created_at: true,
        updated_at: true,

        status: {
          select: {
            energy: true,
            focus: true,
            health: true,
            level: true,
            xp: true,
            gold: true,
          },
        },

        class: {
          select: {
            description: true,
            type_class: {
              select: {
                type: {
                  select: {
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (player != null) {
      console.log(player.status);
      let status: PlayerStatusDto = {
        energy: player.status == null ? 0 : player.status.energy,
        focus: player.status == null ? 0 : player.status.focus,
        health: player.status == null ? 0 : player.status.health,
        level: player.status == null ? 0 : player.status.level,
        xp: player.status == null ? 0 : player.status.xp,
        gold: player.status == null ? 0 : player.status.gold,
      };

      let type: TypeClassDto[] =
        player.class?.type_class?.map((typeClass) => ({
          description: typeClass.type.description,
        })) ?? [];

      let types: TypesClassDto = {
        types: type,
      };

      let classInfo: ClassDto = {
        description: player.class.description,
        type_class: types,
      };

      return {
        id: player.id,
        name: player.name,
        username: player.username,
        class: classInfo,
        status: status,
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Player não encontrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createPlayer(
    player: CreatePlayerDto,
  ): Promise<CreatePlayerResponseDto> {
    const createdPlayer = await this.prismaService.player.create({
      data: {
        name: player.name,
        username: player.username,
        password: player.password,
        class_id: player.class_id,
        status: {
          create: {
            energy: 10,
            focus: 5,
            health: 10,
            level: 1,
            xp: 0,
            gold: 0,
          },
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        created_at: true,
        updated_at: true,

        status: {
          select: {
            energy: true,
            focus: true,
            health: true,
            level: true,
            xp: true,
            gold: true,
          },
        },

        class: {
          select: {
            description: true,
            type_class: {
              select: {
                type: {
                  select: {
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    let status: PlayerStatusDto = {
      energy: createdPlayer.status == null ? 0 : createdPlayer.status.energy,
      focus: createdPlayer.status == null ? 0 : createdPlayer.status.focus,
      health: createdPlayer.status == null ? 0 : createdPlayer.status.health,
      level: createdPlayer.status == null ? 0 : createdPlayer.status.level,
      xp: createdPlayer.status == null ? 0 : createdPlayer.status.xp,
      gold: createdPlayer.status == null ? 0 : createdPlayer.status.gold,
    };

    let type: TypeClassDto[] =
      createdPlayer.class?.type_class?.map((typeClass) => ({
        description: typeClass.type.description,
      })) ?? [];

    let types: TypesClassDto = {
      types: type,
    };

    let classInfo: ClassDto = {
      description: createdPlayer.class.description,
      type_class: types,
    };

    return {
      id: createdPlayer.id,
      name: createdPlayer.name,
      username: createdPlayer.username,
      class: classInfo,
      status: status,
    };
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
        class: {
          select: {
            description: true,
            type_class: {
              select: {
                type: {
                  select: {
                    description: true,
                  },
                },
              },
            },
          },
        },
        status: {
          select: {
            energy: true,
            focus: true,
            health: true,
            level: true,
            xp: true,
            gold: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });

    let status: PlayerStatusDto = {
      energy: player.status == null ? 0 : player.status.energy,
      focus: player.status == null ? 0 : player.status.focus,
      health: player.status == null ? 0 : player.status.health,
      level: player.status == null ? 0 : player.status.level,
      xp: player.status == null ? 0 : player.status.xp,
      gold: player.status == null ? 0 : player.status.gold,
    };

    let type: TypeClassDto[] =
      player.class?.type_class?.map((typeClass) => ({
        description: typeClass.type.description,
      })) ?? [];

    let types: TypesClassDto = {
      types: type,
    };

    let classInfo: ClassDto = {
      description: player.class.description,
      type_class: types,
    };

    return {
      id: player.id,
      name: player.name,
      username: player.username,
      class: classInfo,
      status: status,
    };
  }

  async deletePlayer(playerId: number): Promise<DeletePlayerResponseDto> {
    return {
      message: 'Player deleted successfully',
      id: playerId,
    };
  }
}
