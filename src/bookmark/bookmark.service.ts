import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { updateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookmarkDto, userId: number) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookmark;
  }

  async getAll(userId: number) {
    return this.prisma.bookmark.findMany({ where: { userId } });
  }

  async getOne(userId: number, id: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        userId,
        id,
      },
    });
  }

  async update(dto: updateBookmarkDto, userId: number, id: number) {
    return this.prisma.bookmark.update({
      where: {
        userId,
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.bookmark.delete({
      where: {
        userId,
        id,
      },
    });
  }
}
