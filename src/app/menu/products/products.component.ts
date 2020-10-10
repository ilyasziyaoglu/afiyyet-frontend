import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {AdminSessionService} from '../../base/services/admin-session.service';
import {MenuService} from '../../services/menu.service';
import {MenuSessionService} from '../../base/services/menu-session.service';
import {MenuLocalService} from '../../base/services/menu-local.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

    isFavEnabled = false;

    constructor(
        public menuService: MenuService,
        public favoriteService: FavoriteService,
        public menuSessionService: MenuSessionService,
        public menuLocalService: MenuLocalService
    ) {
        //this.isFavEnabled = menuService.menu.brand.features.includes(featureType.FAVORITE);
    }

    ngOnInit(): void {
    }

    onLike(item: any) {
        this.menuService.like(item);
    }

    productClick(product) {
        this.menuSessionService.setCurrentProduct(product);
    }
}
