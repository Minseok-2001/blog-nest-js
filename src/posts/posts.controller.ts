import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { CurrentUserDto } from 'src/users/dto/current-user.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Get()
  public findPostsByUserId(@CurrentUser() { id }: CurrentUserDto) {
    return this.postsService.findPostsByUserId(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  public createPost(
    @CurrentUser() { id }: CurrentUserDto,
    @Body() dto: CreatePostDto,
  ) {
    console.log(id);
    return this.postsService.createPost(id, dto);
  }
}
