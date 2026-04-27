import { QuestResponseDto } from 'src/quest/dto/quest-response-dto';
import { ActMilestonesDto } from './act-milestones.dto';
import { ActStatus } from './act-status.enum';

export class ActResponseDto {
  id!: number;
  name!: string;
  description!: string;
  deadline!: Date;
  xp_reward!: number;
  gold_reward!: number;
  status!: ActStatus;
  quests!: QuestResponseDto[];
  milestornes!: ActMilestonesDto[];
  created_at!: Date;
  updated_at?: Date;
}
