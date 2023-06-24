import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'test@test.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'somePassword',
  })
  @IsString()
  password: string;
}
