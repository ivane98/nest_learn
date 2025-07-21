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
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() dto: CreateBookmarkDto, @GetUser('userId') userId: number) {
    console.log(userId);
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
