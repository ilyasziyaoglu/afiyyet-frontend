import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {AdminSessionService} from '../../base/services/admin-session.service';
import {MenuService} from '../../services/menu.service';
import {MenuSessionService} from '../../base/services/menu-session.service';

@Component({
  selector: 'app-item',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  currentProduct;

  constructor(
      public storageService: AdminSessionService,
      public menuService: MenuService,
      public favoriteService: FavoriteService,
      public menuSessionService: MenuSessionService
  ) {
    this.currentProduct = menuSessionService.getCurrentProduct();
  }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }

}
