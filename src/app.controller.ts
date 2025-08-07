import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
// @UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  // @CacheKey('test')
  // @CacheTTL(60)
  async getHello() {
    return this.appService.getHello();
  }
}
