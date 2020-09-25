import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {StorageService} from '../../base/services/storage.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-item',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductDetailComponent implements OnInit {

  item: any;

  constructor(
      public storageService: StorageService,
      private menuService: MenuService,
      public favoriteService: FavoriteService
  ) {
    this.item = storageService.getItem('item');
  }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }

}
