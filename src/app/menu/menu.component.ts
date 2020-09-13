import {Component, OnInit} from '@angular/core';
import {StorageService} from '../services/storage.service';
import {FavoriteService} from '../services/favorite.service';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu = {
    currency: 'TL',
    content: []
  };

  constructor(
      public storageService: StorageService,
      public menuService: MenuService,
      public favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.menu = this.menuService.menu;
  }
}
