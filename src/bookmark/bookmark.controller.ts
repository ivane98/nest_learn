import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseGuards(JwtAuthGuard)
@Controller('bookmark')
@UseInterceptors(CacheInterceptor)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() dto: CreateBookmarkDto, @GetUser('userId') userId: number) {
    return this.bookmarkService.create(dto, userId);
  }

  @Get()
  getAll(@GetUser('userId') userId: number) {
    return this.bookmarkService.getAll(userId);
  }

  @Get(':id')
  getOne(
    @GetUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.getOne(userId, id);
  }

  @Patch(':id')
  update(
    @Body() dto: CreateBookmarkDto,
    @GetUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.update(dto, userId, id);
  }

  @Delete(':id')
  remove(
    @GetUser('userId') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.remove(userId, id);
  }
}
