import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { RtGuard } from './guards/rt.guard';
import { isPublic } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @isPublic()
  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @isPublic()
  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  logout(@GetUser('id') userId: number) {
    console.log(userId);
    return this.authService.logout(userId);
  }

  @isPublic()
  @UseGuards(RtGuard)
  @Post('refresh')
  refresh(@GetUser('id') userId: number, @GetUser('refresh_token') rt: string) {
    return this.authService.refresh(userId, rt);
  }
}
