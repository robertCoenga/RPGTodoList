import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActService } from './act.service';
import { ActResponseDto } from './dto/act-response.dto';
import { CreateActDto } from './dto/create-act.dto';
import { GetActDto } from './dto/get-act.dto';

@Controller('acts')
export class ActController {
  constructor(private readonly actService: ActService) {}
  @Get(':player_id')
  getAllActsByPlayerId(
    @Param('player_id') actParam: number,
  ): Promise<ActResponseDto[]> {
    return this.actService.getAllActsByPlayerId(actParam);
  }

  @Get(':id')
  getActById(@Param() actId: GetActDto): Promise<ActResponseDto> {
    return this.actService.getActById(actId);
  }

  @Post('/create')
  createAct(@Body() createActDto: CreateActDto): Promise<ActResponseDto> {
    return this.actService.createAct(createActDto);
  }

  @Put('/update/:id')
  updateAct(
    @Param() actId: GetActDto,
    @Body() updateActDto: CreateActDto,
  ): Promise<ActResponseDto> {
    return this.actService.updateAct(actId, updateActDto);
  }

  @Delete(':id')
  deleteAct(@Param() actId: GetActDto): Promise<Object> {
    return this.actService.deleteAct(actId);
  }
}
