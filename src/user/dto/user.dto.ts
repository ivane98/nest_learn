import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../auth/decorators/roles.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  firstname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastname: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty()
  role: Role;
}
