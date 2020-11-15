import { Injectable } from '@angular/core';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {BaseService} from '../base/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class BasketService extends BaseService{

  basePath = 'order'
  BASKET_KEY = '@basket';
  currentBasketItem;

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  addItemBasket(item) {
    let items = this.getItemsBasket();
    items.push(item);
    this.setItemsBasket(items);
  }

  setItemsBasket(items) {
    localStorage.setItem(this.BASKET_KEY, JSON.stringify(items))
  }

  getItemsBasket() {
    let items = localStorage.getItem(this.BASKET_KEY);
    return items ? JSON.parse(items): [];
  }

  sendBasket(order, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, this.getBasePath(), order, cb);
  }
}
