import { Module } from '@nestjs/common';
import { CacheModule, CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: 'memory',
      ttl: 60 * 60,
      max: 100,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService, CacheModule],
})
export class CustomCacheModule {} 