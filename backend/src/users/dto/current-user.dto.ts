import { IsNumber } from 'class-validator';

export class CurrentUserDto {
  @IsNumber()
  id: number;
}
