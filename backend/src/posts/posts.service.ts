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

  public async updatePost(id: number, { title, content }: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
  }
}
