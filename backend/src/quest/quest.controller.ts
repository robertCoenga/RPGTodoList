import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest-dto';
import { GetQuestDateDto } from './dto/get-quest-date-dto';
import { GetQuestDto } from './dto/get-quest-dto';
import { QuestService } from './quest.service';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}
  @Get('act/:id')
  async getQuestsByAct(@Param() actId: GetQuestDto) {
    try {
      return await this.questService.getQuestsByAct(actId);
    } catch (error) {
      throw new Error('Error fetching quests by act');
    }
  }

  @Get('buff/:id')
  async getQuestsByBuff(@Param() buffId: GetQuestDto) {
    try {
      return await this.questService.getQuestsByBuff(buffId);
    } catch (error) {
      throw new Error('Error fetching quests by buff');
    }
  }

  @Get('skill-tree/:id')
  async getQuestsBySkillTree(@Param() skillTreeId: GetQuestDto) {
    try {
      return await this.questService.getQuestsBySkillTree(skillTreeId);
    } catch (error) {
      throw new Error('Error fetching quests by skill tree');
    }
  }
  @Get('month')
  async getCalendarQuestsByMonth(
    @Query('playerId') playerId: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ): Promise<Object> {
    try {
      console.log(playerId, month, year);
      return await this.questService.getCalendarQuestsByMonth({
        playerId,
        month,
        year,
      });
    } catch (error) {
      throw new Error('Error fetching calendar quests by month' + error);
    }
  }

  @Get('/date/:date')
  async getCalendarQuestsByDate(@Param() date: GetQuestDateDto) {
    try {
      return await this.questService.getCalendarQuestsByDate(date);
    } catch (error) {
      throw new Error('Error fetching calendar quests by date');
    }
  }

  @Get(':id')
  async getQuestById(@Param('id') id: string) {
    try {
      const quest: GetQuestDto = { id: Number(id) };
      return await this.questService.getQuestById(quest);
    } catch (error) {
      throw new Error('Error fetching quest by id');
    }
  }

  @Post('/create')
  async createQuest(@Body() questData: CreateQuestDto) {
    try {
      return await this.questService.createQuest(questData);
    } catch (error) {
      throw new Error('Error creating quest');
    }
  }

  @Put('/update/:id')
  async updateQuest(
    @Param() id: GetQuestDto,
    @Body('questData') questData: CreateQuestDto,
  ) {
    try {
      return await this.questService.updateQuest(id, questData);
    } catch (error) {
      throw new Error('Error updating quest');
    }
  }

  @Delete('/:id')
  async deleteQuest(@Param('id') id: GetQuestDto) {}
}
