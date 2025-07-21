import { IsOptional, IsString } from 'class-validator';

export class updateBookmarkDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  link: string;
}
