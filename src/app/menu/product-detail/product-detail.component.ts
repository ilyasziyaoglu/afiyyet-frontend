import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {SessionService} from '../../base/services/session.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-item',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
      public storageService: SessionService,
      public menuService: MenuService,
      public favoriteService: FavoriteService
  ) {
  }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }

}
