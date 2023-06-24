import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @ApiProperty({
    example: 'test@test.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'somePassword',
  })
  @IsString()
  password: string;
}
