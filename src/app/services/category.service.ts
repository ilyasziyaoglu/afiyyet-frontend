import { Injectable } from '@angular/core';
import {BaseService} from '../common/services/base-service';
import {HttpMethod, HttpService} from '../common/services/http.service';
import {StorageService} from '../common/services/storage.service';
import {Category} from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  basePath = 'category';
  currentCategory: Category;

  constructor(
      httpService: HttpService,
      private storageService: StorageService
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  insertCategory(category: any, cb?) {
    this.post(category, cb);
  }

  deleteCategory(categoryId: any, cb?) {
    this.delete(categoryId, cb);
  }

  updateCategory(category: Category, cb?) {
    this.put(category, cb);
  }

  arrangeCateogories(idOrderPairs: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/arrange-cateogories`, idOrderPairs, cb);
  }

  getCategoriesByBrand(cb?) {
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-categories-by-brand`, '', cb);
  }
}
