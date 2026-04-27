export class ActMilestonesDto {
  id!: number;
  description!: string;
  finished!: boolean;
  deadline!: DataViewConstructor;
  reward!: string;
  created_at!: Date;
  updated_at?: Date;
}
