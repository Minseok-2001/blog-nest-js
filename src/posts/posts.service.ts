import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findPostsByUserId(id: number) {
    return this.prisma.post.findMany({
      where: { authorId: id },
    });
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
}
