import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../services/favorite.service';
import {StorageService} from '../common/services/storage.service';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {

  items;

  constructor(
      public storageService: StorageService,
      private menuService: MenuService,
      public favoriteService: FavoriteService
  ) {

    this.items = this.storageService.getItem('menu').categories.find( v => {
       return v.name === this.storageService.getItem('category').name;
     }).items;
  }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }
}
