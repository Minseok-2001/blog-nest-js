import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
  public findPostsByUserId(@CurrentUser() { uid }: CurrentUserDto) {
    return this.postsService.getPostsByUserId(uid);
  }

  @Get()
  public findAllPosts() {
    return this.postsService.getAllPosts();
  }

  @UseGuards(AuthGuard)
  @Post()
  public createPost(
    @CurrentUser() { uid }: CurrentUserDto,
    @Body() dto: CreatePostDto,
  ) {
    return this.postsService.createPost(uid, dto);
  }

  @UseGuards(AuthGuard)
  @Put()
  public updatePost(
    @CurrentUser() { uid }: CurrentUserDto,
    @Body() dto: CreatePostDto,
  ) {
    return this.postsService.createPost(uid, dto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  public deletePost(
    @CurrentUser() { uid }: CurrentUserDto,
    @Param('pid') pid: number,
  ) {
    return this.postsService.deletePost(pid, uid);
  }
}
