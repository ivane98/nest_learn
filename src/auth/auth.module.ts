import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RtStrategy } from './strategy/rt.strategy';

@Module({
  imports: [JwtModule.register({}), ConfigModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy, RtStrategy],
})
export class AuthModule {}
