import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { BrandDataAccess } from 'src/dataAccess/brand.dataAccess';

@Injectable()
export class BrandsService {
  constructor(
    private readonly brandDataAccess: BrandDataAccess,
    private readonly cacheService: CacheService,
  ) {}

  async findAll() {
    //finding as cache
    const cachedBrands = await this.cacheService.get('all_brand');
    if (cachedBrands) {
      return cachedBrands;
    }

    // find as database
    const brands = await this.brandDataAccess.findAll();

    // save in cache
    await this.cacheService.set('all_brand', brands, 3600);
    return brands;
  }

  async findOne(id: number) {
    return await this.brandDataAccess.findById(id);
  }
}
