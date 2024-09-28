import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {FavoriteService} from '../../services/favorite.service';
import {MenuLocalService} from '../../base/services/menu-local.service';
import {MenuSessionService} from '../../base/services/menu-session.service';
import {DialogBasketComponent} from '../dialog-basket/dialog-basket.component';
import {BasketService} from '../../services/basket.service';
import {MatDialog} from '@angular/material/dialog';

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
        private basketService: BasketService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
    }

    onLike(item: any) {
        this.menuService.like(item);
    }

    productClick(product) {
        this.menuService.currentProduct = product;
        this.menuSessionService.setCurrentProduct(product.id);
    }

    addBasket(product) {
        this.basketService.currentBasketItem = {product};
        this.dialog.open(DialogBasketComponent);
    }

}
