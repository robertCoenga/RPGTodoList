import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest-dto';
import { GetCalendarMonthDto } from './dto/get-month.dto';
import { GetQuestDateDto } from './dto/get-quest-date-dto';
import { GetQuestDto } from './dto/get-quest-dto';
import { QuestService } from './quest.service';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}
  @Get('/act/:id')
  async getQuestsByAct(@Param() actId: GetQuestDto) {
    try {
      return await this.questService.getQuestsByAct(actId);
    } catch (error) {
      throw new Error('Error fetching quests by act');
    }
  }

  @Get('/buff/:id')
  async getQuestsByBuff(@Param() buffId: GetQuestDto) {
    try {
      return await this.questService.getQuestsByBuff(buffId);
    } catch (error) {
      throw new Error('Error fetching quests by buff');
    }
  }

  @Get('/skill-tree/:id')
  async getQuestsBySkillTree(@Param() skillTreeId: GetQuestDto) {
    try {
      return await this.questService.getQuestsBySkillTree(skillTreeId);
    } catch (error) {
      throw new Error('Error fetching quests by skill tree');
    }
  }

  @Get('/:id')
  async getQuestById(@Param() id: GetQuestDto) {
    try {
      return await this.questService.getQuestById(id);
    } catch (error) {
      throw new Error('Error fetching quest by id');
    }
  }

  @Get('/month')
  async getCalendarQuestsByMonth(@Param() month: GetCalendarMonthDto) {
    try {
      return await this.questService.getCalendarQuestsByMonth(month);
    } catch (error) {
      throw new Error('Error fetching calendar quests by month');
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
