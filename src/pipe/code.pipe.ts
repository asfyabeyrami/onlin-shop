import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CodePipe implements PipeTransform {
  transform(value: any) {
    let { code } = value;
    if (!code) {
      return value;
    }
    code = parseInt(code);
    if (`${code}`.length !== 4) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: ' تعداد کد وارد شده درست نمی باشد ',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
    return value;
  }
}
