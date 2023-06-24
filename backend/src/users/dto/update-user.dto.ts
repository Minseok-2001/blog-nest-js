import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: '홍길동',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'test@test.com',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'somePassword',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
