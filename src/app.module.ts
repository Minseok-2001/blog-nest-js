import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [jwtConfig],
      isGlobal: true,
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
