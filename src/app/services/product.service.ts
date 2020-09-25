import { Injectable } from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {Item} from './models/models';
import {StorageService} from '../base/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  basePath = 'product';

  constructor(
      httpService: HttpService,
      private storageService: StorageService
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  getProduct(itemId: any, cb) {
    this.get(itemId, cb);
  }

  deleteProduct(itemId: any, cb?) {
    this.delete(itemId, cb);
  }

  insetProduct(category: any, item: Item, cb?) {
    item.category = category;
    this.post(item, cb);
  }

  updateProduct(item: Item, cb?) {
    this.put(item, cb);
  }

  arrangeProducts(idOrderPairs: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/arrange-products`, idOrderPairs, cb);
  }

  getProductsByCategory(categoryId: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-products-by-category/${categoryId}`, '', cb);
  }

  setEditProductToSession(value) {
    this.storageService.setItem('edit-item', value);
  }

  deleteEditProductFromSession() {
    this.storageService.removeItem('edit-item');
  }

  getEditProductFromSessioon() {
    return this.storageService.getItem('edit-item');
  }
}
