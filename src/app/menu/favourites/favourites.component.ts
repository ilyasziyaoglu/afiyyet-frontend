import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {FavoriteService} from '../../services/favorite.service';
import {MenuLocalService} from '../../base/services/menu-local.service';
import {MenuSessionService} from '../../base/services/menu-session.service';

@Component({
    selector: 'app-most-popular',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {

    constructor(
        public menuService: MenuService,
        public favoriteService: FavoriteService,
        public menuLocalService: MenuLocalService,
        public menuSessionService: MenuSessionService,
    ) {}

    ngOnInit(): void {
    }

    onLike(item: any, isCampaign?) {
        this.menuService.like(item, isCampaign);
    }

    productClick(product) {
        this.menuService.currentProduct = product;
        this.menuSessionService.setCurrentProduct(product.id);
    }

}
