import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
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
    return this.postsService.getPostsByUserId(id);
  }

  @Get()
  public findAllPosts() {
    return this.postsService.getAllPosts();
  }

  @UseGuards(AuthGuard)
  @Post()
  public createPost(
    @CurrentUser() { id }: CurrentUserDto,
    @Body() dto: CreatePostDto,
  ) {
    return this.postsService.createPost(id, dto);
  }

  @UseGuards(AuthGuard)
  @Put()
  public updatePost(
    @CurrentUser() { id }: CurrentUserDto,
    @Body() dto: CreatePostDto,
  ) {
    return this.postsService.createPost(id, dto);
  }
}
