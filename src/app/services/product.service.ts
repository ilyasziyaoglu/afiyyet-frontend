import { Injectable } from '@angular/core';
import {BaseService} from '../common/services/base-service';
import {HttpMethod, HttpService} from '../common/services/http.service';
import {Item} from '../model/models';
import {StorageService} from '../common/services/storage.service';

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

  insetProduct(categoryId: any, item: Item, cb?) {
    item.category = {id: categoryId};
    this.post(item, cb);
  }

  updateProduct(item: Item, cb?) {
    this.put(item, cb);
  }

  arrangeProducts(idOrderPairs: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/arrangeProducts`, idOrderPairs, cb);
  }

  getProductsByCategory(categoryId: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-products-by-category${categoryId}`, cb);
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
