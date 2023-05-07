import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createSecretKey } from 'crypto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid format');
    }

    const secretKey = this.configService.get<string>('jwt.secretKey');

    const token = authorizationHeader.slice(7, authorizationHeader.length);
    try {
      const decoded = this.jwtService.verify(token, { secret: secretKey });
      request.id = decoded.id;

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
