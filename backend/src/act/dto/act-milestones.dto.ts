export class ActMilestonesDto {
  id!: number;
  description!: string;
  finished!: boolean;
  deadline!: Date;
  reward!: string;
  created_at!: Date;
  updated_at?: Date;
}
