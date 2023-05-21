import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDto } from 'src/users/dto/current-user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserDto => {
    const request = ctx.switchToHttp().getRequest();
    return {
      uid: request.id,
    };
  },
);
