import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {MenuService} from '../../services/menu.service';
import {MenuSessionService} from '../../base/services/menu-session.service';
import {MenuLocalService} from '../../base/services/menu-local.service';

@Component({
  selector: 'app-item',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  currentProduct;
  isFavEnabled = false;

  constructor(
      public menuLocalService: MenuLocalService,
      public menuService: MenuService,
      public favoriteService: FavoriteService,
      public menuSessionService: MenuSessionService
  ) {
    let currProdId = menuSessionService.getCurrentProduct();
    let currCatId = menuSessionService.getCurrentCategory();
    //this.isFavEnabled = menuService.menu.brand.features.includes(featureType.FAVORITE);

    const brand = window.location.href.split('/')[5];
    if ( brand ) this.menuService.getMenu(brand, () => {
      this.currentProduct = menuService.menu?.categories
          .find(cat => cat.id === currCatId).products
          .find(prod => prod.id === currProdId);
    });
  }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }

}
