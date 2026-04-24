import { TypesClassDto } from './types-class.dto';

export class ClassDto {
  id?: number;
  description!: string;
  type_class!: TypesClassDto;
  created_at?: Date;
  updated_at?: Date;
}
