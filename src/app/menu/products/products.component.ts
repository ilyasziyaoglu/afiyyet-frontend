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

    items = [];

    constructor(
        public storageService: StorageService,
        private menuService: MenuService,
        public favoriteService: FavoriteService,
    ) {

        this.items = this.menuService.serviceMenu.categories.find(v => {
            return v.name === this.storageService.getItem('category').name;
        }).items;
    }

    ngOnInit(): void {
    }

    onLike(item: any) {
        this.menuService.like(item);
    }
}