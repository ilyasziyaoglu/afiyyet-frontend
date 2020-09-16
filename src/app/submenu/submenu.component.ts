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

  constructor(
      public storageService: StorageService,
      private menuService: MenuService,
      public favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }
}
