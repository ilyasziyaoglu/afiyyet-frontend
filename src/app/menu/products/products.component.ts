import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {StorageService} from '../../base/services/storage.service';
import {MenuService} from '../../services/menu.service';

@Component({
    selector: 'app-submenu',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

    constructor(
        public storageService: StorageService,
        private menuService: MenuService,
        public favoriteService: FavoriteService,
    ) {
    }

    getProducts() {
        return this.menuService.menu.categories.find(v => {
            return v.name === this.storageService.getItem('category').name;
        }).products;
    }

    ngOnInit(): void {
    }

    onLike(item: any) {
        this.menuService.like(item);
    }
}
