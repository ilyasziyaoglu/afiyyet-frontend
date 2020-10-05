import {Component} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {MenuService} from '../../services/menu.service';
import {AdminSessionService} from '../../base/services/admin-session.service';
import {MenuSessionService} from '../../base/services/menu-session.service';

@Component({
    selector: 'app-menu',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {

    constructor(
        public storageService: AdminSessionService,
        public menuService: MenuService,
        public favoriteService: FavoriteService,
        private menuSessionService: MenuSessionService
    ) {
    }

    onLike(item: any) {
        this.menuService.like(item);
    }

    productClick(product) {
        this.menuSessionService.setCurrentProduct(product);
    }

    categoryClick(category) {
        this.menuSessionService.setCurrentCategory(category);
    }
}
