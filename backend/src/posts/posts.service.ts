import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  public async getPostsByUserId(id: number) {
    return this.prisma.post.findMany({
      where: { authorId: id },
    });
  }

  public async getAllPosts() {
    return this.prisma.post.findMany();
  }

  public async createPost(authorId: number, { title, content }: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  }

  public async updatePost(pid: number, { title, content }: UpdatePostDto) {
    return this.prisma.post.update({
      where: { pid },
      data: {
        title,
        content,
      },
    });
  }

  async deletePost(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { pid: postId },
      select: { authorId: true },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.authorId !== userId) {
      throw new Error('Unauthorized to delete this post');
    }

    return this.prisma.post.delete({
      where: { pid: postId },
    });
  }
}
