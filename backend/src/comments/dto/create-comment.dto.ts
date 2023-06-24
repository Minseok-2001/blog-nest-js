import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  postId: number;

  @ApiProperty({
    example: '안녕',
  })
  @IsString()
  content: string;
}
