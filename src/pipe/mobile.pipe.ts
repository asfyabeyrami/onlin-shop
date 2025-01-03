import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class MobilePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { mobile } = value;
    if (!mobile) {
      return value;
    } else {
      if (
        (mobile.indexOf('+98') > -1 &&
          (mobile.length !== 13 ||
            !/^[0-9]+$/.test(mobile.substring(1, mobile.length)))) ||
        (mobile.indexOf('+98') === -1 &&
          (mobile.length !== 11 || !/^[0-9]+$/.test(mobile)))
      ) {
        throw new HttpException(
          {
            status: HttpStatus.FAILED_DEPENDENCY,
            error: 'شماره به درستی وارد نشده است',
          },
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
      if (
        (mobile.length === 13 && mobile.substring(0, 4) !== '+989') ||
        (mobile.length === 11 && mobile.substring(0, 2) !== '09')
      ) {
        throw new HttpException(
          {
            status: HttpStatus.FAILED_DEPENDENCY,
            error: 'شماره استاندارد وارد نشده است',
          },
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
      return value;
    }
  }
}
