import { Injectable } from '@angular/core';
import {Category, Item} from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }


  deleteItem(itemId: any) {}

  insertItem(categoryId: any, item: Item) {}

  updateItem(itemId: any, item: Item) {}

  arrangeItemOrders(categoryId: any, idOrderPairs: any) {}

  insertCategory(companyId: any, category: Category) {}

  deleteCategory(categoryId: any) {}

  updateCategoryName(categoryId: any, name: string) {}

  arrangeCateogoryOrders(companyId: any, idOrderPairs: any) {}

  getCategoryItems(categoryId: any) {}

  getItem(itemId: any) {}
}
