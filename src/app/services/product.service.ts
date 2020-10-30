import { Injectable } from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {Product} from './models/models';
import {AdminSessionService} from '../base/services/admin-session.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  basePath = 'product';

  constructor(
      httpService: HttpService
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

  insetProduct(category: any, item: Product, cb?) {
    item.category = category;
    item.type = 'PRODUCT';
    this.post(item, cb);
  }

  updateProduct(item: Product, cb?) {
    this.put(item, cb);
  }

  arrangeProducts(idOrderPairs: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/arrange-products`, idOrderPairs, cb);
  }

  getProductsByCategory(categoryId: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-products-by-category/${categoryId}`, '', cb);
  }

  bulkPriceUpdate(bulkPriceUpdateRequest: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/bulk-price-update`, bulkPriceUpdateRequest, cb);
  }
}
