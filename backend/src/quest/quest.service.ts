import { Injectable } from '@nestjs/common';
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
      const quests = await this.prismaService.quest.findMany({
        where: {
          act_id: actId.id,
        },
        select: {
          id: true,
          description: true,
          userId: true,
          actId: true,
          skillTreeId: true,
          buffId: true,
          typeId: true,
          complexity: true,
          xp_reward: true,
          dateInicio: true,
          dateFim: true,
          concluded: true,
        },
      });
      return { quests };
    } catch (error) {
      throw new Error('Error fetching quests by act');
    }
  }

  async getQuestsByBuff(buffId: GetQuestDto): Promise<QuestsResponseDto> {
    try {
      const quests = await this.prismaService.quest.findMany({
        where: {
          buffId: buffId.id,
        },
        select: {
          id: true,
          description: true,
          userId: true,
          actId: true,
          skillTreeId: true,
          buffId: true,
          typeId: true,
          complexity: true,
          xp_reward: true,
          dateInicio: true,
          dateFim: true,
          concluded: true,
        },
      });
      return { quests };
    } catch (error) {
      throw new Error('Error fetching quests by act');
    }
  }

  async getQuestsBySkillTree(
    skillTreeId: GetQuestDto,
  ): Promise<QuestsResponseDto> {
    try {
      const quests = await this.prismaService.quest.findMany({
        where: {
          skillTreeId: skillTreeId.id,
        },
        select: {
          id: true,
          description: true,
          userId: true,
          actId: true,
          skillTreeId: true,
          buffId: true,
          typeId: true,
          complexity: true,
          xp_reward: true,
          dateInicio: true,
          dateFim: true,
          concluded: true,
        },
      });
      return { quests };
    } catch (error) {
      throw new Error('Error fetching quests by act');
    }
  }

  async getQuestById(questId: GetQuestDto): Promise<QuestResponseDto> {
    try {
      const quest = await this.prismaService.quest.findUnique({
        where: {
          id: questId.id,
        },
        select: {
          id: true,
          description: true,
          userId: true,
          actId: true,
          skillTreeId: true,
          buffId: true,
          typeId: true,
          complexity: true,
          xp_reward: true,
          dateInicio: true,
          dateFim: true,
          concluded: true,
        },
      });
      return quest;
    } catch (error) {
      throw new Error('Error fetching quest by id');
    }
  }

  async getCalendarQuestsByMonth(
    month: GetQuestDateDto,
  ): Promise<QuestsResponseDto> {
    const quests = await this.prismaService.quest.findMany({
      where: {
        dateInicio: {
          gte: new Date(
            month.questDate.getFullYear(),
            month.questDate.getMonth(),
            1,
          ),
        },
        dateFim: {
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
        userId: true,
        actId: true,
        skillTreeId: true,
        buffId: true,
        typeId: true,
        complexity: true,
        xp_reward: true,
        dateInicio: true,
        dateFim: true,
        concluded: true,
      },
    });
    return { quests };
  }

  async getCalendarQuestsByDate(
    day: GetQuestDateDto,
  ): Promise<QuestsResponseDto> {
    try {
      const quests = await this.prismaService.quest.findMany({
        where: {
          OR: [{ dateInicio: day.questDate }, { dateFim: day.questDate }],
        },
        select: {
          id: true,
          description: true,
          userId: true,
          actId: true,
          skillTreeId: true,
          buffId: true,
          typeId: true,
          complexity: true,
          xp_reward: true,
          dateInicio: true,
          dateFim: true,
          concluded: true,
        },
      });
      return { quests };
    } catch (error) {
      throw new Error('Error fetching quests by date');
    }
  }

  async createQuest(createQuest: CreateQuestDto): Promise<QuestResponseDto> {
    try {
      const quest = await this.prismaService.quest.create({
        data: {
          description: createQuest.description,
          userId: createQuest.userId,
          actId: createQuest.actId,
          skillTreeId: createQuest.skillTreeId,
          buffId: createQuest.buffId,
          typeId: createQuest.typeId,
          complexity: createQuest.complexity,
          xp_reward: createQuest.xp_reward,
          dateInicio: createQuest.dateInicio,
          dateFim: createQuest.dateFim,
          concluded: createQuest.concluded,
        },
        select: {
          id: true,
          description: true,
          userId: true,
          actId: true,
          skillTreeId: true,
          buffId: true,
          typeId: true,
          complexity: true,
          xp_reward: true,
          dateInicio: true,
          dateFim: true,
          concluded: true,
          createdAt: true,
          updatedAt: false,
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
      const quest = await this.prismaService.quest.update({
        where: {
          id: questId.id,
        },
        data: {
          description: updateQuest.description,
          userId: updateQuest.userId,
          actId: updateQuest.actId,
          skillTreeId: updateQuest.skillTreeId,
          buffId: updateQuest.buffId,
          typeId: updateQuest.typeId,
          complexity: updateQuest.complexity,
          xp_reward: updateQuest.xp_reward,
          dateInicio: updateQuest.dateInicio,
          dateFim: updateQuest.dateFim,
          concluded: updateQuest.concluded,
        },
        select: {
          id: true,
          description: true,
          userId: true,
          actId: true,
          skillTreeId: true,
          buffId: true,
          typeId: true,
          complexity: true,
          xp_reward: true,
          dateInicio: true,
          dateFim: true,
          concluded: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return quest;
    } catch (error) {
      throw new Error('Error updating quest');
    }
  }

  async deleteQuest(questId: GetQuestDto) {}
}
