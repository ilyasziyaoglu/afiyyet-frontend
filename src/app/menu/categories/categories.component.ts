import {Component} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {MenuService} from '../../services/menu.service';
import {StorageService} from '../../base/services/storage.service';

@Component({
    selector: 'app-menu',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {

    constructor(
        public storageService: StorageService,
        public menuService: MenuService,
        public favoriteService: FavoriteService,
    ) {
    }

    onLike(item: any) {
        this.menuService.like(item);
    }
}
