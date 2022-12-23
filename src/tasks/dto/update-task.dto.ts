import { IsNotEmpty } from 'class-validator';

export class UpdateATaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
