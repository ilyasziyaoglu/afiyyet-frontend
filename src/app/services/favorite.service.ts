import {Injectable} from '@angular/core';
import {MenuService} from './menu.service';
import {AdminSessionService} from '../base/services/admin-session.service';
import {MenuLocalService} from '../base/services/menu-local.service';

@Injectable({
    providedIn: 'root',
})
export class FavoriteService {

    constructor(
        private menuService: MenuService,
        private menuLocalService: MenuLocalService
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

    removeFavorite(id) {
        this.menuLocalService.removeFavourite(id);
    }

    addFavorite(id) {
        this.menuLocalService.addFavourite(id);
    }

    isFavorite(id) {
        return this.menuLocalService.getFavourites().includes((id));
    }
}
