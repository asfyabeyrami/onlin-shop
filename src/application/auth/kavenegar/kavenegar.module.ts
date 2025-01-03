import { Module, DynamicModule } from '@nestjs/common';
import { KavenegarService } from './kavenegar.service';
import { KavenegarOptions } from './interfaces/kavenegar-options.interface';

@Module({})
export class KavenegarModule {
  static register(options: KavenegarOptions): DynamicModule {
    return {
      module: KavenegarModule,
      providers: [
        {
          provide: KavenegarService,
          useValue: new KavenegarService(options),
        },
      ],
      exports: [KavenegarService],
    };
  }
} 