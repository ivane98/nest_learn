import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.create({
      data: {
        email,
        hash: await argon2.hash(password),
      },
    });

    const tokens = await this.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async signIn(dto: AuthDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const pwMatch = await argon2.verify(user.hash, password);

    if (!pwMatch) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const tokens = await this.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async refresh(userId: number, rt: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');

    const rtMatches = await argon2.verify(user.hashedRt, rt);

    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    return this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const access_token = await this.jwt.sign(
      { sub: userId, email },
      { secret: this.config.getOrThrow('JWT_SECRET'), expiresIn: '15m' },
    );

    const refresh_token = await this.jwt.sign(
      { sub: userId, email },
      { secret: this.config.getOrThrow('RT_SECRET'), expiresIn: '1w' },
    );
    return { access_token, refresh_token };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await argon2.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
