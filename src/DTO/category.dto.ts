import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'عنوان دسته‌بندی نمی‌تواند خالی باشد' })
  @IsString()
  @Length(2, 100, { message: 'عنوان دسته‌بندی باید بین ۲ تا ۱۰۰ کاراکتر باشد' })
  title: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'شناسه دسته‌بندی پدر باید عددی مثبت باشد' })
  fatherId: number;
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsOptional()
  @ApiProperty({ type: String })
  fatherId: number;
}
