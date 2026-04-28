import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActMilestonesDto } from './dto/act-milestones.dto';
import { ActResponseDto } from './dto/act-response.dto';
import { CreateActDto } from './dto/create-act.dto';
import { GetActDto } from './dto/get-act.dto';

@Injectable()
export class ActService {
  constructor(private prismaService: PrismaService) {}

  async getAllActsByPlayerId(player_id: number): Promise<ActResponseDto[]> {
    try {
      const acts = await this.prismaService.act.findMany({
        where: {
          player_id: Number(player_id),
        },
        select: {
          id: true,
          name: true,
          description: true,
          deadline: true,
          xp_reward: true,
          gold_reward: true,
          milestornes: {
            select: {
              id: true,
              description: true,
              finished: true,
              deadline: true,
              reward: true,
              created_at: true,
            },
          },
          created_at: true,
        },
      });

      let actResponseDtos: ActResponseDto[] = acts.map((act) => {
        const actResponseDto = new ActResponseDto();
        const milestones: ActMilestonesDto[] = act.milestornes.map(
          (milestone) => {
            const milestoneDto = new ActMilestonesDto();
            milestoneDto.id = milestone.id;
            milestoneDto.description = milestone.description;
            milestoneDto.finished = milestone.finished;
            milestoneDto.deadline = milestone.deadline;
            milestoneDto.reward = milestone.reward;
            milestoneDto.created_at = milestone.created_at;
            return milestoneDto;
          },
        );
        actResponseDto.id = act.id;
        actResponseDto.name = act.name;
        actResponseDto.description = act.description;
        actResponseDto.deadline = act.deadline;
        actResponseDto.xp_reward = act.xp_reward;
        actResponseDto.gold_reward = act.gold_reward;
        actResponseDto.milestornes = milestones;
        actResponseDto.created_at = act.created_at;
        return actResponseDto;
      });
      return actResponseDtos;
    } catch (error) {
      throw error;
    }
  }
  async getActById(actParam: GetActDto): Promise<ActResponseDto> {
    try {
      const act = await this.prismaService.act.findUnique({
        where: { id: actParam.id },
        select: {
          id: true,
          name: true,
          description: true,
          deadline: true,
          xp_reward: true,
          gold_reward: true,
          milestornes: {
            select: {
              id: true,
              description: true,
              finished: true,
              deadline: true,
              reward: true,
              created_at: true,
            },
          },
          created_at: true,
        },
      });
      if (!act) {
        throw new HttpException('Act not found', HttpStatus.NOT_FOUND);
      }
      const actResponseDto = new ActResponseDto();
      const milestones: ActMilestonesDto[] = act.milestornes.map(
        (milestone) => {
          const milestoneDto = new ActMilestonesDto();
          milestoneDto.id = milestone.id;
          milestoneDto.description = milestone.description;
          milestoneDto.finished = milestone.finished;
          milestoneDto.deadline = milestone.deadline;
          milestoneDto.reward = milestone.reward;
          milestoneDto.created_at = milestone.created_at;
          return milestoneDto;
        },
      );
      actResponseDto.id = act.id;
      actResponseDto.name = act.name;
      actResponseDto.description = act.description;
      actResponseDto.deadline = act.deadline;
      actResponseDto.xp_reward = act.xp_reward;
      actResponseDto.gold_reward = act.gold_reward;
      actResponseDto.milestornes = milestones;
      actResponseDto.created_at = act.created_at;

      return actResponseDto;
    } catch (error) {
      throw error;
    }
  }
  async createAct(createActDto: CreateActDto): Promise<ActResponseDto> {
    try {
      const act = await this.prismaService.act.create({
        data: {
          name: createActDto.name,
          description: createActDto.description,
          deadline: createActDto.deadline,
          xp_reward: createActDto.xp_reward,
          gold_reward: createActDto.gold_reward,
          player_id: createActDto.player_id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          deadline: true,
          xp_reward: true,
          gold_reward: true,
          milestornes: {
            select: {
              id: true,
              description: true,
              finished: true,
              deadline: true,
              reward: true,
              created_at: true,
            },
          },
          created_at: true,
        },
      });

      if (!act) {
        throw new HttpException(
          'Act not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const actResponseDto = new ActResponseDto();
      const milestones: ActMilestonesDto[] = act.milestornes.map(
        (milestone) => {
          const milestoneDto = new ActMilestonesDto();
          milestoneDto.id = milestone.id;
          milestoneDto.description = milestone.description;
          milestoneDto.finished = milestone.finished;
          milestoneDto.deadline = milestone.deadline;
          milestoneDto.reward = milestone.reward;
          milestoneDto.created_at = milestone.created_at;
          return milestoneDto;
        },
      );
      actResponseDto.id = act.id;
      actResponseDto.name = act.name;
      actResponseDto.description = act.description;
      actResponseDto.deadline = act.deadline;
      actResponseDto.xp_reward = act.xp_reward;
      actResponseDto.gold_reward = act.gold_reward;
      actResponseDto.milestornes = milestones;
      actResponseDto.created_at = act.created_at;

      return actResponseDto;
    } catch (error) {
      throw error;
    }
  }
  async updateAct(
    actParam: GetActDto,
    updateActDto: CreateActDto,
  ): Promise<ActResponseDto> {
    try {
      const act = await this.prismaService.act.update({
        where: { id: actParam.id },
        data: {
          name: updateActDto.name,
          description: updateActDto.description,
          deadline: updateActDto.deadline,
          xp_reward: updateActDto.xp_reward,
          gold_reward: updateActDto.gold_reward,
          player_id: updateActDto.player_id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          deadline: true,
          xp_reward: true,
          gold_reward: true,
          milestornes: {
            select: {
              id: true,
              description: true,
              finished: true,
              deadline: true,
              reward: true,
              created_at: true,
            },
          },
          created_at: true,
        },
      });

      if (!act) {
        throw new HttpException(
          'Act not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const actResponseDto = new ActResponseDto();
      const milestones: ActMilestonesDto[] = act.milestornes.map(
        (milestone) => {
          const milestoneDto = new ActMilestonesDto();
          milestoneDto.id = milestone.id;
          milestoneDto.description = milestone.description;
          milestoneDto.finished = milestone.finished;
          milestoneDto.deadline = milestone.deadline;
          milestoneDto.reward = milestone.reward;
          milestoneDto.created_at = milestone.created_at;
          return milestoneDto;
        },
      );
      actResponseDto.id = act.id;
      actResponseDto.name = act.name;
      actResponseDto.description = act.description;
      actResponseDto.deadline = act.deadline;
      actResponseDto.xp_reward = act.xp_reward;
      actResponseDto.gold_reward = act.gold_reward;
      actResponseDto.milestornes = milestones;
      actResponseDto.created_at = act.created_at;

      return actResponseDto;
    } catch (error) {
      throw error;
    }
  }

  async deleteAct(actParam: GetActDto) {
    try {
      const act = await this.prismaService.act.findUnique({
        where: { id: actParam.id },
        select: { id: true },
      });
      if (!act) {
        throw new HttpException('Act not found', HttpStatus.NOT_FOUND);
      }
      await this.prismaService.act.delete({ where: { id: actParam.id } });

      return {
        message: 'Ato excluido com sucesso',
        id: act.id,
      };
    } catch (error) {
      throw error;
    }
  }
}
