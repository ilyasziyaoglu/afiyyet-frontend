import {Injectable} from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {Product} from './models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  basePath = 'product';
  productList: Product[];

  constructor(
      httpService: HttpService
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  get(itemId: any, cb) {
    super.get(itemId, cb);
  }

  delete(itemId: any, cb?) {
    super.delete(itemId, cb);
  }

  insert(category: any, item: Product, cb?) {
    item.category = category;
    item.type = 'PRODUCT';
    this.post(item, cb);
  }

  update(item: Product, cb?) {
    this.put(item, cb);
  }

  arrange(idOrderPairs: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/arrange-products`, idOrderPairs, cb);
  }

  getProductsByCategory(categoryId: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-products-by-category/${categoryId}`, '', cb);
  }

  bulkPriceUpdate(bulkPriceUpdateRequest: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/bulk-price-update`, bulkPriceUpdateRequest, cb);
  }

  getProductList() {
    if ( this.productList ) {
      return this.productList;
    }
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/list`, '', res => this.productList = res);
  }
}
