import { Injectable } from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {AdminSessionService} from '../base/services/admin-session.service';
import {Category} from './models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  basePath = 'category';
  currentCategory: Category;
  categories: Category[];

  constructor(
      httpService: HttpService,
      private storageService: AdminSessionService
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
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/arrange-categories`, idOrderPairs, cb);
  }

  getCategoriesByBrand(cb?) {
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-categories-by-brand`, '', cb);
  }
}
