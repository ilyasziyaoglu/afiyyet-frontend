import {Injectable} from '@angular/core';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {BaseService} from '../base/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{

  basePath = 'order';

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  createOrder(order, cb?) {
    order.orderItems.forEach(oi => delete oi.product.category);
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/create`, order, cb);
  }
}
