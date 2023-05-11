import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCommentsByUserId(id: number) {
    return this.prisma.comment.findMany({
      where: { authorId: id },
    });
  }

  async createComment(id: number, { content, postId }: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        authorId: id,
        content,
        postId,
      },
    });
  }
}
