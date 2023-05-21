import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { CurrentUserDto } from 'src/users/dto/current-user.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getCommentsByUserId(@CurrentUser() { uid }: CurrentUserDto) {
    return this.commentsService.getCommentsByUserId(uid);
  }

  @Post()
  createComment(
    @CurrentUser() { uid }: CurrentUserDto,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(uid, dto);
  }
}
