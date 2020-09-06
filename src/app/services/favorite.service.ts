import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {MenuService} from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
      private storageService: StorageService,
      private menuService: MenuService
  ) { }

  getFavorites() {
    const favorites = [];
    for ( const category of this.menuService.menu.content ) {
      for ( const item of category.items ) {
        if (this.isFavorite(item.id)) {
          favorites.push(item);
        }
      }
    }
    return favorites;
  }

  removeFavorite(item: any) {
    const index = this.storageService.favorites.indexOf(item.id);
    this.storageService.favorites.splice(index, 1);
    this.storageService.updateItem('favorites');
  }

  addFavorite(item: any) {
    this.storageService.favorites.push(item.id);
    this.storageService.updateItem('favorites');
  }

  isFavorite(id) {
    return this.storageService.favorites.includes((id));
  }
}