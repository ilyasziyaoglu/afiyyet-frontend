import { Injectable } from '@angular/core';
import {Category, Item} from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }


  deleteItem(itemId: any) {
    console.log("delete", itemId);
  }

  insertItem(categoryId: any, item: Item) {
    console.log("insert", {categoryId, item});
  }

  updateItem(item: Item) {
    console.log("update", {item});
  }

  arrangeItemOrders(idOrderPairs: any) {}

  insertCategory(category: Category) {}

  deleteCategory(categoryId: any) {}

  updateCategoryName(categoryId: any, name: string) {
    console.log({categoryId, name});
  }

  arrangeCateogoryOrders(idOrderPairs: any) {
    console.log({idOrderPairs});
  }

  getCategoryItems(categoryId: any) {}

  getItem(itemId: any) {}
}
