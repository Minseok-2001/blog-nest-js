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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  public findPostsByUserId(@CurrentUser() { uid }: CurrentUserDto) {
    return this.postsService.getPostsByUserId(uid);
  }

  @Get()
  public findAllPosts() {
    return this.postsService.getAllPosts();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('me')
  public createPost(
    @CurrentUser() { uid }: CurrentUserDto,
    @Body() dto: CreatePostDto,
  ) {
    return this.postsService.createPost(uid, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':pid')
  public updatePost(
    @CurrentUser() { uid }: CurrentUserDto,
    @Param('pid') pid: number,
    @Body() dto: CreatePostDto,
  ) {
    return this.postsService.updatePost(pid, uid, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':pid')
  public deletePost(
    @CurrentUser() { uid }: CurrentUserDto,
    @Param('pid') pid: number,
  ) {
    return this.postsService.deletePost(pid, uid);
  }
}
