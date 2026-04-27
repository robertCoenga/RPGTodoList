import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestDto } from './dto/create-quest-dto';
import { GetQuestDateDto } from './dto/get-quest-date-dto';
import { GetQuestDto } from './dto/get-quest-dto';
import { QuestResponseDto } from './dto/quest-response-dto';
import { QuestsResponseDto } from './dto/quests-response-dto';

@Injectable()
export class QuestService {
  constructor(private prismaService: PrismaService) {}

  async getQuestsByAct(actId: GetQuestDto): Promise<QuestsResponseDto> {
    try {
      const quests: QuestResponseDto[] =
        await this.prismaService.quest.findMany({
          where: {
            act_id: actId.id,
          },
          select: {
            id: true,
            description: true,
            type_id: true,
            complexity: true,
            xp_reward: true,
            data_inicio: true,
            data_fim: true,
            concluded: true,
            created_at: true,
          },
        });
      return { quests };
    } catch (error) {
      throw new Error('Error fetching quests by act');
    }
  }

  async getQuestsByBuff(buffId: GetQuestDto): Promise<QuestsResponseDto> {
    try {
      const questArray = await this.prismaService.quest.findMany({
        where: {
          buff_id: buffId.id,
        },
        select: {
          id: true,
          description: true,
          type_id: true,
          complexity: true,
          xp_reward: true,
          data_inicio: true,
          data_fim: true,
          concluded: true,
          created_at: true,
        },
      });

      const quests: QuestsResponseDto = { quests: questArray };
      return { quests: questArray };
    } catch (error) {
      throw new Error('Error fetching quests by act');
    }
  }

  async getQuestsBySkillTree(
    skillTreeId: GetQuestDto,
  ): Promise<QuestsResponseDto> {
    try {
      const quests: QuestResponseDto[] =
        await this.prismaService.quest.findMany({
          where: {
            skll_id: skillTreeId.id,
          },
          select: {
            id: true,
            description: true,
            act_id: true,
            type_id: true,
            complexity: true,
            xp_reward: true,
            data_inicio: true,
            data_fim: true,
            concluded: true,
            created_at: true,
          },
        });
      return { quests };
    } catch (error) {
      throw new Error('Error fetching quests by act');
    }
  }

  async getQuestById(questId: GetQuestDto): Promise<QuestResponseDto> {
    try {
      const quest: QuestResponseDto | null =
        await this.prismaService.quest.findUnique({
          where: {
            id: questId.id,
          },
          select: {
            id: true,
            description: true,
            type_id: true,
            complexity: true,
            xp_reward: true,
            data_inicio: true,
            data_fim: true,
            concluded: true,
            created_at: true,
          },
        });

      if (!quest) {
        throw new HttpException('Quest not found', HttpStatus.NOT_FOUND);
      }
      return quest;
    } catch (error) {
      throw new Error('Error fetching quest by id');
    }
  }

  async getCalendarQuestsByMonth(
    month: GetQuestDateDto,
  ): Promise<QuestsResponseDto> {
    const quests: QuestResponseDto[] = await this.prismaService.quest.findMany({
      where: {
        player_id: month.playerId,
        data_inicio: {
          gte: new Date(
            month.questDate.getFullYear(),
            month.questDate.getMonth(),
            1,
          ),
        },
        data_fim: {
          lt: new Date(
            month.questDate.getFullYear(),
            month.questDate.getMonth() + 1,
            1,
          ),
        },
      },
      select: {
        id: true,
        description: true,
        type_id: true,
        complexity: true,
        xp_reward: true,
        data_inicio: true,
        data_fim: true,
        concluded: true,
        created_at: true,
      },
    });
    return { quests };
  }

  async getCalendarQuestsByDate(
    day: GetQuestDateDto,
  ): Promise<QuestsResponseDto> {
    try {
      const quests: QuestResponseDto[] =
        await this.prismaService.quest.findMany({
          where: {
            player_id: day.playerId,
            OR: [{ data_inicio: day.questDate }, { data_fim: day.questDate }],
          },
          select: {
            id: true,
            description: true,
            type_id: true,
            complexity: true,
            xp_reward: true,
            data_inicio: true,
            data_fim: true,
            concluded: true,
            created_at: true,
          },
        });
      return { quests };
    } catch (error) {
      throw new Error('Error fetching quests by date');
    }
  }

  async createQuest(createQuest: CreateQuestDto): Promise<QuestResponseDto> {
    try {
      const quest: QuestResponseDto = await this.prismaService.quest.create({
        data: {
          description: createQuest.description,
          player_id: createQuest.userId,
          act_id: createQuest.actId,
          type_id: createQuest.typeId,
          complexity: createQuest.complexity,
          xp_reward: createQuest.xp_reward,
          data_inicio: createQuest.dateInicio,
          data_fim: createQuest.dateFim,
          concluded: createQuest.concluded,
        },
        select: {
          id: true,
          description: true,
          type_id: true,
          complexity: true,
          xp_reward: true,
          data_inicio: true,
          data_fim: true,
          concluded: true,
          created_at: true,
          updated_at: false,
        },
      });
      return quest;
    } catch (error) {
      throw new Error('Error creating quest');
    }
  }

  async updateQuest(
    questId: GetQuestDto,
    updateQuest: CreateQuestDto,
  ): Promise<QuestResponseDto> {
    try {
      const quest: QuestResponseDto = await this.prismaService.quest.update({
        where: {
          id: questId.id,
        },
        data: {
          description: updateQuest.description,
          player_id: updateQuest.userId,
          act_id: updateQuest.actId,
          type_id: updateQuest.typeId,
          complexity: updateQuest.complexity,
          xp_reward: updateQuest.xp_reward,
          data_inicio: updateQuest.dateInicio,
          data_fim: updateQuest.dateFim,
          concluded: updateQuest.concluded,
        },
        select: {
          id: true,
          description: true,
          type_id: true,
          complexity: true,
          xp_reward: true,
          data_inicio: true,
          data_fim: true,
          concluded: true,
          created_at: true,
        },
      });
      return quest;
    } catch (error) {
      throw new Error('Error updating quest');
    }
  }

  async deleteQuest(questId: GetQuestDto) {}
}
