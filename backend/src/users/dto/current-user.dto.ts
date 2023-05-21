import { IsNumber } from 'class-validator';

export class CurrentUserDto {
  @IsNumber()
  uid: number;
}
