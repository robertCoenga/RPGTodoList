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
import { GetQuestDateDto } from './dto/get-quest-date-dto';
import { GetQuestDto } from './dto/get-quest-dto';

@Controller('quest')
export class QuestController {
  @Get('/act/:id')
  async getQuestsByAct(@Param('actId') actId: GetQuestDto) {}

  @Get('/buff/:id')
  async getQuestsByBuff(@Param('buffId') buffId: GetQuestDto) {}

  @Get('/skill-tree/:id')
  async getQuestsBySkillTree(@Param('skillTreeId') skillTreeId: GetQuestDto) {}

  @Get('/:id')
  async getQuestById(@Param('id') id: GetQuestDto) {}

  @Get('/month/:month')
  async getCalendarQuestsByMonth(@Param('month') month: GetQuestDateDto) {}

  @Get('/date/:date')
  async getCalendarQuestsByDate(@Param('date') date: GetQuestDateDto) {}

  @Post('/create')
  async createQuest(@Body('questData') questData: CreateQuestDto) {}

  @Put('/update/:id')
  async updateQuest(
    @Param('id') id: GetQuestDto,
    @Body('questData') questData: CreateQuestDto,
  ) {}

  @Delete('/:id')
  async deleteQuest(@Param('id') id: GetQuestDto) {}
}
