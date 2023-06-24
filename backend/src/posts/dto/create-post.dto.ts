import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: '안녕하세요.',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'ㅎㅇㅎㅇ',
  })
  @IsString()
  content: string;
}
