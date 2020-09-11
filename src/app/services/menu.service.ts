import { Injectable } from '@angular/core';
import {Category, Item} from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu = {
    currency: 'TL',
    content: []
  };

  constructor() {
    for (let i = 0; i < 10; i ++) {
      let category = new Category();
      category.name = 'SOGUK ICECEKLER' + i;
      category.mainmedia = 'https://www.cardinalmarkt.com/class/INNOVAEditor/assets/soguk.jpg';
      category.items = [];
      category.order = i;

      for (let j = 0; j < 10; j ++) {
        let item = new Item();
        item.id = i.toString() + j.toString();
        item.rate = 3 + Math.round(Math.random() * 2);
        item.likes = Math.round(Math.random() * 300);
        item.name = 'Latte Machiatto Latte Machiatto' + i + j;
        item.image = 'https://www.645kk.com/wp-content/uploads/2017/07/CAFE-LATTE.jpg';
        item.price = 20.00;
        item.content = '';
        item.order = j;

        category.items.push(item);
      }

      this.menu.content.push(category);
    }
  }

  getCategories() {
    return this.menu.content;
  }

}
