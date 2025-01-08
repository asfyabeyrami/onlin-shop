import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { CatDataAccess } from 'src/dataAccess/category.dataAccess';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly catDataAccess: CatDataAccess,
    private readonly cacheService: CacheService,
  ) {}

  async findAll() {
    //finding as cache
    const cachedCategories = await this.cacheService.get('all_categories');
    if (cachedCategories) {
      return cachedCategories;
    }

    // find as database
    const categories = await this.catDataAccess.findAll();

    // save in cache
    await this.cacheService.set('all_categories', categories, 3600);
    return categories;
  }

  async findOne(id: number) {
    // find as cache
    const cacheKey = `category_${id}`;
    const cachedCategory = await this.cacheService.get(cacheKey);
    if (cachedCategory) {
      return cachedCategory;
    }

    // find in database
    const category = await this.catDataAccess.findOne(id);

    // save in cache
    await this.cacheService.set(cacheKey, category, 3600);

    return category;
  }
}
