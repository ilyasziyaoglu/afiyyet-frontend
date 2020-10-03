import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {StorageService} from '../../base/services/storage.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-item',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
      public storageService: StorageService,
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
