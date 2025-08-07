import { PrismaService } from '../prisma/prisma.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

describe('BookmarksController', () => {
  let bookmarkController: BookmarkController;
  let bookmarkService: BookmarkService;

  beforeEach(() => {
    const prisma = new PrismaService();
    bookmarkService = new BookmarkService(prisma);
    bookmarkController = new BookmarkController(bookmarkService);
  });

  describe('getAll', () => {
    it('should return an array of bookmarks', async () => {
      const userId = 2;
      const mockResult = [
        {
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: 'Example',
          description: 'desc',
          link: 'https://example.com',
          userId,
        },
      ];
      jest.spyOn(bookmarkService, 'getAll').mockResolvedValue(mockResult);

      const result = await bookmarkController.getAll(userId);

      expect(result).toEqual(mockResult);
    });
  });

  describe('getOne', () => {
    it('it shpuld return one bookmark', async () => {
      const userId = 2;
      const id = 1;
      const mockResult = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Example',
        description: 'desc',
        link: 'https://example.com',
        userId,
      };

      jest.spyOn(bookmarkService, 'getOne').mockResolvedValue(mockResult);

      const result = await bookmarkController.getOne(userId, id);

      expect(result).toEqual(mockResult);
    });
  });
});
