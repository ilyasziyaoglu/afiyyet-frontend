import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService{

  BASKET_KEY = '@basket';
  currentBasketItem;

  addItemBasket(item) {
    const items = this.getItemsBasket();
    items.push(item);
    this.setItemsBasket(items);
  }

  setItemsBasket(items) {
    localStorage.setItem(this.BASKET_KEY, JSON.stringify(items));
  }

  getItemsBasket() {
    const items = localStorage.getItem(this.BASKET_KEY);
    return items ? JSON.parse(items) : [];
  }
}
