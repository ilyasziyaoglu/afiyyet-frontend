import {Injectable} from '@angular/core';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {BaseService} from '../base/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService extends BaseService{

  basePath = 'orderitem';

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  cancelFromAdmin(orderItemCancel, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/cancel-from-admin`, orderItemCancel, cb);
  }
}
