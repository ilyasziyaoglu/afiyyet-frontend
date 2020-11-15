import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {FavoriteService} from '../../services/favorite.service';
import {MenuSessionService} from '../../base/services/menu-session.service';
import {MenuLocalService} from '../../base/services/menu-local.service';
import {DialogBasketComponent} from '../dialog-basket/dialog-basket.component';
import {BasketService} from '../../services/basket.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {

  constructor(
      public menuLocalService: MenuLocalService,
      public menuService: MenuService,
      public favoriteService: FavoriteService,
      public menuSessionService: MenuSessionService,
      private basketService: BasketService,
      private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }

  addBasket(product) {
    this.basketService.currentBasketItem = {product};
    this.dialog.open(DialogBasketComponent);
  }

}
