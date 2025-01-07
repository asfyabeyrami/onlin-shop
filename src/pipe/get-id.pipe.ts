import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UserIdPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('شناسه کاربر یافت نشد');
    }
    return value;
  }
}

// this is how to use :  @User('id', UserIdPipe) adminId: number
