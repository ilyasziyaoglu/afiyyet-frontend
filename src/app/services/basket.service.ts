import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService{

  BASKET_KEY = '@basket';
  currentBasketItem;

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
}
