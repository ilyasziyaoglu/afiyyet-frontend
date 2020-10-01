import {Injectable} from '@angular/core';
import {MenuService} from './menu.service';
import {StorageService} from '../base/services/storage.service';

@Injectable({
    providedIn: 'root',
})
export class FavoriteService {

    constructor(
        private storageService: StorageService,
        private menuService: MenuService,
    ) {
    }

    getFavorites() {
        const favorites = [];
        if ( this.menuService.menu ) {
            for (const category of this.menuService.menu.categories) {
                if ( category.products ) {
                    for (const item of category.products) {
                        if ( this.isFavorite(item.id) ) {
                            favorites.push(item);
                        }
                    }
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
