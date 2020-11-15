import { Injectable } from '@angular/core';
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

  sendBasket(order, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, this.getBasePath(), order, cb);
  }
}
