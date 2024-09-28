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

  summary(filterReq, cb): void {
    let reqParams = "";
    filterReq.startDate ? reqParams += "?createdDate.greaterThanOrEqual=" + filterReq.startDate.toISOString() : "";
    filterReq.endDate ? reqParams += "&createdDate.lessThanOrEqual=" + filterReq.endDate.toISOString() : "";
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/summary${reqParams}`, '', cb);
  }

  roundPerTablePerHour(filterReq, cb): void {
    let reqParams = "";
    filterReq.startDate ? reqParams += "?createdDate.greaterThanOrEqual=" + filterReq.startDate.toISOString() : "";
    filterReq.endDate ? reqParams += "&createdDate.lessThanOrEqual=" + filterReq.endDate.toISOString() : "";
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/round-per-table-per-hour${reqParams}`, '', cb);
  }

  hourlyDistribution(filterReq, cb): void {
    let reqParams = "";
    filterReq.startDate ? reqParams += "?createdDate.greaterThanOrEqual=" + filterReq.startDate.toISOString() : "";
    filterReq.endDate ? reqParams += "&createdDate.lessThanOrEqual=" + filterReq.endDate.toISOString() : "";
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/hourly-distribution${reqParams}`, '', cb);
  }
}
